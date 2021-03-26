const mssql = require("mssql");

const pool = require("../../../database/db");
const errHandler = require("../../../helpers/errors");

const logout = (req, res) => {
  if (req.cookies.sessionId) {
    pool
      .then((connection) => {
        const { sessionId } = req.cookies;
        const getSession = new mssql.Request(connection);
        getSession
          .input("id", mssql.VarChar(50), sessionId)
          .execute("getSession", (err, result) => {
            if (!err) {
              if (result.recordset.length > 0) {
                const deleteSession = new mssql.Request(connection);
                deleteSession
                  .input("id", mssql.VarChar(50), sessionId)
                  .execute("deleteSession", (err, _) => {
                    if (!err) {
                      res.cookie("sessionId", null, {
                        expires: new Date(0),
                        maxAge: 0,
                      });
                      res.json({
                        isLoggedIn: false,
                        role: null,
                      });
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
                  404,
                  null,
                  "Пользовательская сессия не была найдена"
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
      403,
      null,
      "Для выхода из системы необходимо авторизоваться"
    );
  }
};

module.exports = logout;
