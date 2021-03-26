const mssql = require("mssql");

const pool = require("../../database/db");
const errHandler = require("../../helpers/errors");

const phones = (req, res) => {
  pool
    .then((connection) => {
      const getUser = new mssql.Request(connection);
      const { phone } = req.query;
      getUser
        .input("phone", mssql.VarChar(13), phone ? phone : null)
        .execute("getPhones", (err, result) => {
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

module.exports = phones;
