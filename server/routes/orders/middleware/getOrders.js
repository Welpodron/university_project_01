const mssql = require("mssql");
const pool = require("../../../database/db");
const errHandler = require("../../../helpers/errors");

const getOrders = (req, res) => {
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
                const role = result.recordset[0].Role;
                console.log(role);
                if (role.includes("STAFF_")) {
                  const getOrders = new mssql.Request(connection);
                  getOrders
                    .input("role", mssql.VarChar(50), role)
                    .execute("getOrders", (err, result) => {
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
                  errHandler(
                    res,
                    403,
                    null,
                    "У пользователя недостаточно прав"
                  );
                }
              } else {
                errHandler(
                  res,
                  404,
                  null,
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
      "Пользователь не авторизован, требуется авторизация"
    );
  }
};

module.exports = getOrders;
