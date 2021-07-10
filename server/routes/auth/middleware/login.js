const mssql = require("mssql");
const bcrypt = require("bcrypt");
const uid = require("uid-safe").sync;

const pool = require("../../../database/db");
const errHandler = require("../../../helpers/errors");

const login = (req, res) => {
  if (req.body) {
    const { login, password } = req.body;
    if (login && password) {
      pool
        .then((connection) => {
          const getUser = new mssql.Request(connection);
          getUser
            .input("login", mssql.VarChar(50), login)
            .execute("findUser", (err, result) => {
              if (!err) {
                if (result.recordset.length > 0) {
                  const role = result.recordset[0].Role;
                  const employeeId = result.recordset[0].EmployeeId;
                  bcrypt
                    .compare(password, result.recordset[0].Password)
                    .then((result) => {
                      if (result) {
                        if (req.cookies.sessionId) {
                          const { sessionId } = req.cookies;
                          const getSession = new mssql.Request(connection);
                          getSession
                            .input("id", mssql.VarChar(50), sessionId)
                            .execute("getSession", (err, result) => {
                              if (!err) {
                                if (result.recordset.length > 0) {
                                  if (result.recordset[0].Login === login) {
                                    const updateSession = new mssql.Request(
                                      connection
                                    );
                                    const newSessionId = uid(24);
                                    const expires = new Date(
                                      Date.now() + 24 * 3600000
                                    );
                                    updateSession
                                      .input("id", mssql.VarChar(50), sessionId)
                                      .input(
                                        "newId",
                                        mssql.VarChar(50),
                                        newSessionId
                                      )
                                      .input("expires", mssql.DateTime, expires)
                                      .input("role", mssql.VarChar(50), role)
                                      .execute("updateSession", (err, _) => {
                                        if (!err) {
                                          res.cookie(
                                            "sessionId",
                                            newSessionId,
                                            {
                                              expires,
                                              httpOnly: true,
                                            }
                                          );
                                          res.json({
                                            role,
                                            employeeId,
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
                                    const updateSession = new mssql.Request(
                                      connection
                                    );
                                    const newSessionId = uid(24);
                                    const expires = new Date(
                                      Date.now() + 24 * 3600000
                                    );
                                    updateSession
                                      .input("id", mssql.VarChar(50), sessionId)
                                      .input(
                                        "newId",
                                        mssql.VarChar(50),
                                        newSessionId
                                      )
                                      .input("login", mssql.VarChar(50), login)
                                      .input("expires", mssql.DateTime, expires)
                                      .input("role", mssql.VarChar(50), role)
                                      .execute("updateSession", (err, _) => {
                                        if (!err) {
                                          res.cookie(
                                            "sessionId",
                                            newSessionId,
                                            {
                                              expires,
                                              httpOnly: true,
                                            }
                                          );
                                          res.json({
                                            role,
                                            employeeId,
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
                                  }
                                } else {
                                  const setSession = new mssql.Request(
                                    connection
                                  );
                                  const sessionId = uid(24);
                                  const expires = new Date(
                                    Date.now() + 24 * 3600000
                                  );
                                  setSession
                                    .input("id", mssql.VarChar(50), sessionId)
                                    .input("login", mssql.VarChar(50), login)
                                    .input("expires", mssql.DateTime, expires)
                                    .execute("setSession", (err, _) => {
                                      if (!err) {
                                        res.cookie("sessionId", sessionId, {
                                          expires,
                                          httpOnly: true,
                                        });
                                        res.json({
                                          role,
                                          employeeId,
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
                        } else {
                          const setSession = new mssql.Request(connection);
                          const sessionId = uid(24);
                          const expires = new Date(Date.now() + 24 * 3600000);
                          setSession
                            .input("id", mssql.VarChar(50), sessionId)
                            .input("login", mssql.VarChar(50), login)
                            .input("expires", mssql.DateTime, expires)
                            .input("role", mssql.VarChar(50), role)
                            .execute("setSession", (err, _) => {
                              if (!err) {
                                res.cookie("sessionId", sessionId, {
                                  expires,
                                  httpOnly: true,
                                });
                                res.json({
                                  role,
                                  employeeId,
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
                        }
                      } else {
                        errHandler(
                          res,
                          404,
                          null,
                          "Пользователь с такими данными не найден в базе данных"
                        );
                      }
                    });
                } else {
                  errHandler(
                    res,
                    404,
                    null,
                    "Пользователь с такими данными не найден в базе данных"
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
        400,
        null,
        `Пожалуйста отправьте также ${login ? "пароль" : "логин"} пользователя`
      );
    }
  } else {
    errHandler(
      res,
      400,
      null,
      "Пожалуйста отправьте логин и пароль пользователя"
    );
  }
};

module.exports = login;
