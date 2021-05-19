const mssql = require("mssql");
const pool = require("../../../database/db");
const errHandler = require("../../../helpers/errors");

const moveEmployees = (req, res) => {
  if (req.body) {
    // Нужно проверить права пользователя
    // Очистить сессии и удалить логин и пароль для входа
    const objArr = Object.entries(req.body);
    const employeesIds = new Set();
    objArr.forEach((obj) => {
      employeesIds.add(obj[0].split("_")[1]);
    });
    const updatesArr = [];
    employeesIds.forEach((id) => {
      const updateObj = {};
      updateObj["EmployeeId"] = id;
      const fieldsToUpdate = objArr.filter(
        (arr) => arr[0].split("_")[1] === id
      );
      fieldsToUpdate.forEach((field) => {
        updateObj[field[0].split("_")[0]] = field[1];
      });
      updatesArr.push(updateObj);
    });
    updatesArr.forEach((update) => {
      pool
        .then((connection) => {
          const setOrder = new mssql.Request(connection);
          setOrder
            .input("CategoryId", mssql.Int, update.MoveByOrder)
            .execute("setOrder", (err, result) => {
              if (!err) {
                const orderId = result.recordset[0].Id;
                const connectEmployeeWithOrder = new mssql.Request(connection);
                connectEmployeeWithOrder
                  .input("EmployeeId", mssql.Int, update.EmployeeId)
                  .input("OrderId", mssql.Int, orderId)
                  .execute("connectEmployeeWithOrder", (err, _) => {
                    if (!err) {
                      const updateEmployee = new mssql.Request(connection);
                      updateEmployee
                        .input("Id", mssql.Int, update.EmployeeId)
                        .input("DepId", mssql.Int, update.NewDepartment)
                        .input("JobId", mssql.Int, update.NewJob)
                        .input(
                          "Role",
                          mssql.NVarChar(50),
                          update.NewJob === "1"
                            ? "STAFF_SPECIALIST"
                            : update.NewJob === "2"
                            ? "STAFF_EDITOR"
                            : update.NewJob === "3"
                            ? "STAFF_VACATIONS_PLANNER"
                            : "DEFAULT"
                        )
                        .execute("updateEmployee", (err, _) => {
                          if (!err) {
                            //
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
    res.json({
      message:
        "Приказы были успешно созданы и сотрудники перемещены на новые позиции",
    });
  } else {
    errHandler(
      res,
      400,
      null,
      "Пожалуйста отправьте требуемую информацию для удаления пользователя(ей)"
    );
  }
};

module.exports = moveEmployees;
