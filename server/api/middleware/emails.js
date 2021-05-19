const mssql = require("mssql");

const pool = require("../../database/db");
const errHandler = require("../../helpers/errors");

const emails = (req, res) => {
  pool
    .then((connection) => {
      const getEmails = new mssql.Request(connection);
      const { email } = req.query;
      getEmails
        .input("email", mssql.NVarChar(75), email ? email : null)
        .execute("getEmails", (err, result) => {
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

module.exports = emails;
