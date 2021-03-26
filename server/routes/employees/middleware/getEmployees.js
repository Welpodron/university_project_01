const mssql = require("mssql");
const pool = require("../../../database/db");
const errHandler = require("../../../helpers/errors");

const getEmployees = (req, res) => {
  pool
    .then((connection) => {
      const getEmployees = new mssql.Request(connection);
      getEmployees
        .input("amount", mssql.Int, req.query.amount ? req.query.amount : 20)
        .input("page", mssql.Int, req.query.page ? req.query.page : 0)
        .execute("getEmployees", (err, result) => {
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
