const mssql = require("mssql");
const pool = require("../../../database/db");
const errHandler = require("../../../helpers/errors");

const getEmployees = (req, res) => {
  pool
    .then((connection) => {
      if (req.query.id) {
        const getEmployee = new mssql.Request(connection);
        getEmployee
          .input("id", mssql.Int, req.query.id)
          .execute("getEmployee", (err, result) => {
            if (!err) {
              res.json(result.recordset);
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
        const getEmployees = new mssql.Request(connection);
        getEmployees.execute("getEmployees", (err, result) => {
          if (!err) {
            res.json(result.recordset);
          } else {
            errHandler(
              res,
              500,
              err,
              "Произошла ошибка при обработке запроса в базе данных сервера"
            );
          }
        });
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
};

module.exports = getEmployees;
