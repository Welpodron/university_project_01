const mssql = require("mssql");

const pool = require("../../database/db");
const errHandler = require("../../helpers/errors");

const vacationsTypes = (req, res) => {
  pool
    .then((connection) => {
      const getVacationsTypes = new mssql.Request(connection);
      getVacationsTypes.execute("getVacationsTypes", (err, result) => {
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

module.exports = vacationsTypes;
