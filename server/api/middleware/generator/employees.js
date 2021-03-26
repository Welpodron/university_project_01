const mssql = require("mssql");
const faker = require("faker");
const moment = require("moment");
const bcrypt = require("bcrypt");
faker.locale = "ru";

const pool = require("../../../database/db");
const errHandler = require("../../../helpers/errors");
const getRnd = require("../../../helpers/getRnd");

const CITIES = ["г. Москва", "г. Балашиха", "г. Реутово"];
const STREETS = [
  "ул. Менделеева",
  "ул. Рождественская",
  "ул. Новослободская",
  "ул. Первомайская",
  "ул. Автозаводская",
  "ул. Добрынинская",
  "ул. Пушкина",
];
const JOBSID = [1, 2, 3, 4, 5, 6, 7];
const DEPARTMENTSID = [2, 3, 4, 5, 6, 7];
const GENDER = ["М", "Ж"];
const PASSPORTGIVERS = ["ОУФМС", "ПФК", "ПМС", "ТП", "ЗРК"];

const setEmployee = (req, res) => {
  const { amount } = req.query;

  const howMuch = amount ? amount : 1;

  const usersData = [];

  for (let index = 0; index < howMuch; index++) {
    const rndAddress = `${faker.random.arrayElement(
      CITIES
    )}, ${faker.random.arrayElement(STREETS)}, д. ${getRnd(
      1,
      85
    )}, кв. ${getRnd(1, 250)}`;
    const rndGenderNum = getRnd(0, 1);
    const rndMail = faker.internet.email();
    const rndLogin = Math.random().toString(36).slice(-8);
    const rndPassword = Math.random().toString(36).slice(-8);
    const rndPhone = rndGenderNum
      ? faker.phone.phoneNumber("79#########")
      : null;
    const [rndFirstname, rndLastname] = faker.name
      .findName(undefined, undefined, rndGenderNum)
      .split(" ");
    const rndMiddleName = rndGenderNum
      ? faker.name.middleName(rndGenderNum)
      : null;
    const rndGender = GENDER[rndGenderNum];
    const rndJobId = faker.random.arrayElement(JOBSID);
    let rndDepId;
    if (rndJobId < 4) {
      rndDepId = 1;
    } else {
      rndDepId = faker.random.arrayElement(DEPARTMENTSID);
    }
    const rndPassportNum = getRnd(100000, 999999);
    const rndPassportSerial = getRnd(1000, 9999);
    const rndPassportFrom = `${faker.random.arrayElement(
      PASSPORTGIVERS
    )} ${getRnd(1, 15)} ${faker.random.arrayElement(CITIES)}`;
    const rndBirthday = moment()
      .subtract(getRnd(18, 50), "years")
      .format("YYYY-MM-DD");

    const age = moment(moment().format("YYYY-MM-DD")).diff(
      rndBirthday,
      "years"
    );
    let rndPassportDate;

    if (age < 20) {
      //Прибавить к дате рождения 14 лет
      rndPassportDate = moment(rndBirthday)
        .add(14, "years")
        .format("YYYY-MM-DD");
    } else if (age < 45) {
      //Прибавить к дате рождения 20 лет
      rndPassportDate = moment(rndBirthday)
        .add(20, "years")
        .format("YYYY-MM-DD");
    } else {
      //Прибавить к дате рождения 45 лет
      rndPassportDate = moment(rndBirthday)
        .add(45, "years")
        .format("YYYY-MM-DD");
    }

    pool
      .then((connection) => {
        const setEmployee = new mssql.Request(connection);
        setEmployee
          .input("JobId", mssql.Int, rndJobId)
          .input("DepId", mssql.Int, rndDepId)
          .input("LastName", mssql.NVarChar(50), rndLastname)
          .input("FirstName", mssql.NVarChar(50), rndFirstname)
          .input("MiddleName", mssql.NVarChar(50), rndMiddleName || null)
          .input("Gender", mssql.NChar(1), rndGender)
          .input("Birthday", mssql.Date, rndBirthday)
          .input("PassportSerial", mssql.Int, rndPassportSerial)
          .input("PassportNumber", mssql.Int, rndPassportNum)
          .input("PassportDate", mssql.Date, rndPassportDate)
          .input("PassportFrom", mssql.NVarChar(150), rndPassportFrom)
          .input("Phone", mssql.NVarChar(13), rndPhone)
          .input("Email", mssql.NVarChar(75), rndMail || null)
          .input("Address", mssql.NVarChar(150), rndAddress)
          .execute("setEmployee", (err, result) => {
            if (!err) {
              const employeeId = result.recordset[0].Id;
              const setOrder = new mssql.Request(connection);
              setOrder
                .input("categoryId", mssql.Int, 1)
                .input("status", mssql.NVarChar(25), "Подтвержден")
                .execute("setOrder", (err, result) => {
                  if (!err) {
                    const orderId = result.recordset[0].Id;
                    const connectEmployeeWithOrder = new mssql.Request(
                      connection
                    );
                    connectEmployeeWithOrder
                      .input("EmployeeId", mssql.Int, employeeId)
                      .input("OrderId", mssql.Int, orderId)
                      .execute("connectEmployeeWithOrder", (err, _) => {
                        if (!err) {
                          bcrypt
                            .hash(rndPassword, 10)
                            .then((hash) => {
                              const createUser = new mssql.Request(connection);
                              createUser
                                .input("EmployeeId", mssql.Int, employeeId)
                                .input("Login", mssql.NVarChar(50), rndLogin)
                                .input("Password", mssql.NVarChar(150), hash)
                                .input("Role", mssql.NVarChar(50), "REPLACE_ME")
                                .execute("createUser", (err, result) => {
                                  if (!err) {
                                    usersData.push({
                                      rndLogin,
                                      rndPassword,
                                      hash,
                                    });
                                    console.log(usersData);
                                    // Здесь была бы отправка логина и пароля на почту нового сотрудника а на клиент уведомлении об успешной регистрации сотрудника
                                  } else {
                                    errHandler(
                                      res,
                                      500,
                                      err,
                                      "Произошла ошибка при обработке запроса в базе данных сервера"
                                    );
                                  }
                                });
                            })
                            .catch((err) =>
                              errHandler(
                                res,
                                500,
                                err,
                                "Произошла ошибка при генерации хэша"
                              )
                            );
                        } else {
                          errHandler(
                            res,
                            500,
                            err,
                            "Произошла ошибка при обработке запроса в базе данных сервера"
                          );
                        }
                      });
                  } else {
                    errHandler(
                      res,
                      500,
                      err,
                      "Произошла ошибка при обработке запроса в базе данных сервера"
                    );
                  }
                });
            } else {
              errHandler(
                res,
                500,
                err,
                "Произошла ошибка при обработке запроса в базе данных сервера"
              );
            }
          });
      })
      .catch((err) =>
        errHandler(
          res,
          500,
          err,
          "Произошла ошибка при подключении к базе данных сервера"
        )
      );
  }

  res.json({
    message: "Работа генератора была завершена без ошибок",
  });
};

module.exports = setEmployee;
