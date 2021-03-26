const mssql = require("mssql");

const pool = require("../../../database/db");
const errHandler = require("../../../helpers/errors");

//TO DO: Внимание! отсуствует проверка на истечение куки!

const check = (req, res) => {
  if (req.cookies.sessionId) {
    const { sessionId } = req.cookies;
    pool
      .then((connection) => {
        const getSession = new mssql.Request(connection);
        getSession
          .input("id", mssql.VarChar(50), sessionId)
          .execute("getSession", (err, result) => {
            if (!err) {
              if (result.recordset.length > 0) {
                res.json({
                  role: result.recordset[0].Role,
                });
              } else {
                errHandler(
                  res,
                  404,
                  err,
                  "Внимание сессия не была найдена, требуется повторная авторизация"
                );
              }
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
      401,
      null,
      "Пользователь не авторизован, требуется повторная авторизация"
    );
  }
};

module.exports = check;
