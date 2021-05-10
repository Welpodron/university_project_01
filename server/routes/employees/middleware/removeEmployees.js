const mssql = require("mssql");
const pool = require("../../../database/db");
const errHandler = require("../../../helpers/errors");

const removeEmployees = (req, res) => {
  if (req.body) {
    // Нужно проверить права пользователя
    // Очистить сессии и удалить логин и пароль для входа
    const objArr = Object.entries(req.body);
    objArr.forEach((arr) => {
      const employeeId = arr[0].split("_")[1];
      const orderCategoryId = arr[1];
      pool
        .then((connection) => {
          const setOrder = new mssql.Request(connection);
          setOrder
            .input("CategoryId", mssql.Int, orderCategoryId)
            .execute("setOrder", (err, result) => {
              if (!err) {
                const orderId = result.recordset[0].Id;
                const connectEmployeeWithOrder = new mssql.Request(connection);
                connectEmployeeWithOrder
                  .input("EmployeeId", mssql.Int, employeeId)
                  .input("OrderId", mssql.Int, orderId)
                  .execute("connectEmployeeWithOrder", (err, _) => {
                    if (!err) {
                      const deleteEmployee = new mssql.Request(connection);
                      deleteEmployee
                        .input("Id", mssql.Int, employeeId)
                        .execute("deleteEmployee", (err, _) => {
                          if (err) {
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
                        500,
                        err,
                        "Произошла ошибка при обработке запроса в базе данных сервера"
                      );
                    }
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
        })
        .catch((err) =>
          errHandler(
            res,
            500,
            err,
            "Произошла ошибка при подключении к базе данных сервера"
          )
        );
    });
    res.json({ message: "Приказы были созданы" });
  } else {
    errHandler(
      res,
      400,
      null,
      "Пожалуйста отправьте требуемую информацию для удаления пользователя(ей)"
    );
  }
};

module.exports = removeEmployees;
