const mssql = require("mssql");

const pool = require("../../database/db");
const errHandler = require("../../helpers/errors");

const search = (req, res) => {
  pool
    .then((connection) => {
      const tryEmployee = new mssql.Request(connection);
      const { q, exact } = req.query;
      tryEmployee
        .input("q", mssql.NVarChar(1000), q)
        .input(
          "exact",
          mssql.Bit,
          exact === "1" || exact === "true" || exact === "enable" ? 1 : 0
        )
        .execute("tryToFindEmployee", (err, result) => {
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

module.exports = search;
