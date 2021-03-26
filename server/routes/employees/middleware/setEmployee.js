const mssql = require("mssql");
const pool = require("../../../database/db");
const errHandler = require("../../../helpers/errors");

const setEmployee = (req, res) => {
  if (req.body) {
    const {
      jobId,
      depId,
      lastName,
      firstName,
      middleName,
      gender,
      birthday,
      passportSerial,
      passportNumber,
      passportDate,
      passportFrom,
      contactPhone,
      contactEmail,
      contactAddress,
    } = req.body;
    pool
      .then((connection) => {
        const setEmployee = new mssql.Request(connection);
        setEmployee
          .input("Id", mssql.Int, 69)
          .input("JobId", mssql.Int, jobId)
          .input("DepId", mssql.Int, depId)
          .input("LastName", mssql.NVarChar(50), lastName)
          .input("FirstName", mssql.NVarChar(50), firstName)
          .input("MiddleName", mssql.NVarChar(50), middleName || null)
          .input("Gender", mssql.NChar(1), gender)
          .input("Birthday", mssql.Date, birthday)
          .input("PassportSerial", mssql.Int, passportSerial)
          .input("PassportNumber", mssql.Int, passportNumber)
          .input("PassportDate", mssql.Date, passportDate)
          .input("PassportFrom", mssql.NVarChar(150), passportFrom)
          .input("Phone", mssql.NVarChar(13), contactPhone)
          .input("Email", mssql.NVarChar(75), contactEmail || null)
          .input("Address", mssql.NVarChar(150), contactAddress)
          .execute("setEmployee", (err, result) => {
            if (!err) {
              res.json({
                message: "Сотрудник успешно добавлен",
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
  } else {
    errHandler(
      res,
      400,
      null,
      "Пожалуйста отправьте требуемую информацию для создания пользователя"
    );
  }
};

module.exports = setEmployee;
