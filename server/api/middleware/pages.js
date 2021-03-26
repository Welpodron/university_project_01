const mssql = require("mssql");

const pool = require("../../database/db");
const errHandler = require("../../helpers/errors");

const pages = (req, res) => {
  pool
    .then((connection) => {
      const getPagesAmount = new mssql.Request(connection);
      const { pageSize } = req.query;
      getPagesAmount
        .input("PageSize", mssql.Int, pageSize ? pageSize : 20)
        .execute("getPagesAmount", (err, result) => {
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

module.exports = pages;
