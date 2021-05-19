const mssql = require("mssql");
const pool = require("../../../database/db");
const errHandler = require("../../../helpers/errors");

const updateEmployee = (req, res) => {
  if (req.body) {
    pool
      .then((connection) => {
        if (req.body.employeeId) {
          const updateEmployee = new mssql.Request(connection);
          updateEmployee.input("Id", mssql.Int, req.body.employeeId);
          if (req.body.firstName)
            updateEmployee.input(
              "FirstName",
              mssql.NVarChar(50),
              req.body.firstName
            );
          if (req.body.lastName)
            updateEmployee.input(
              "LastName",
              mssql.NVarChar(50),
              req.body.lastName
            );
          if (req.body.middleName)
            updateEmployee.input(
              "MiddleName",
              mssql.NVarChar(50),
              req.body.middleName
            );
          if (req.body.gender)
            updateEmployee.input("Gender", mssql.NChar(1), req.body.gender);
          if (req.body.birthday)
            updateEmployee.input("Birthday", mssql.Date, req.body.birthday);
          if (req.body.passportSerial)
            updateEmployee.input(
              "PassportSerial",
              mssql.Int,
              req.body.passportSerial
            );
          if (req.body.passportNumber)
            updateEmployee.input(
              "PassportNumber",
              mssql.Int,
              req.body.passportNumber
            );
          if (req.body.passportDate)
            updateEmployee.input(
              "PassportDate",
              mssql.Date,
              req.body.passportDate
            );
          if (req.body.passportFrom)
            updateEmployee.input(
              "PassportFrom",
              mssql.NVarChar(150),
              req.body.passportFrom
            );
          if (req.body.contactPhone)
            updateEmployee.input(
              "Phone",
              mssql.NVarChar(13),
              req.body.contactPhone
            );
          if (req.body.contactEmail)
            updateEmployee.input(
              "Email",
              mssql.NVarChar(75),
              req.body.contactEmail
            );
          if (req.body.contactAddress)
            updateEmployee.input(
              "Address",
              mssql.NVarChar(150),
              req.body.contactAddress
            );
          updateEmployee.execute("updateEmployee", (err, result) => {
            if (!err) {
              res.json({ message: "Информация о сотруднике успешно изменена" });
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
            400,
            null,
            "Пожалуйста отправьте требуемую информацию для обновления пользователя(ей)"
          );
        }
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
      "Пожалуйста отправьте требуемую информацию для обновления пользователя(ей)"
    );
  }
};

module.exports = updateEmployee;
