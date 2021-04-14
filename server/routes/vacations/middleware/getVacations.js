const mssql = require("mssql");
const pool = require("../../../database/db");
const errHandler = require("../../../helpers/errors");

const getVacations = (req, res) => {
  pool
    .then((connection) => {
      const getVacations = new mssql.Request(connection);
      getVacations.execute("getVacations", (err, result) => {
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

module.exports = getVacations;
