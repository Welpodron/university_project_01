const mssql = require("mssql");
const pool = require("../../../database/db");
const errHandler = require("../../../helpers/errors");

const getOrderType = (vacationType) => {
  switch (vacationType) {
    case "1":
      return "8";
    case "3":
      return "9";
    case "4":
      return "10";
    case "5":
      return "11";
    default:
      return "9";
  }
};

const createVacations = (req, res) => {
  if (req.body) {
    pool
      .then((connection) => {
        const vacationsArr = [];
        const objArr = Object.entries(req.body);
        const employeesIds = new Set(
          Object.keys(req.body).map((el) => el.split("_")[1])
        );
        employeesIds.forEach((id) => {
          const updateObj = {};
          updateObj["EmployeeId"] = id;
          const fieldsToUpdate = objArr.filter(
            (arr) => arr[0].split("_")[1] === id
          );
          fieldsToUpdate.forEach((field) => {
            updateObj[field[0].split("_")[0]] = field[1];
          });
          vacationsArr.push(updateObj);
        });
        vacationsArr.forEach((vacation) => {
          const createOrder = new mssql.Request(connection);
          createOrder
            .input("CategoryId", mssql.Int, getOrderType(vacation.Category))
            .execute("setOrder", (err, result) => {
              if (!err) {
                const orderId = result.recordset[0].Id;
                const connectEmployeeWithOrder = new mssql.Request(connection);
                connectEmployeeWithOrder
                  .input("EmployeeId", mssql.Int, vacation.EmployeeId)
                  .input("OrderId", mssql.Int, orderId)
                  .execute("connectEmployeeWithOrder", (err, _) => {
                    if (!err) {
                      const createVacation = new mssql.Request(connection);
                      createVacation
                        .input("EmployeeId", mssql.Int, vacation.EmployeeId)
                        .input("CategoryId", mssql.Int, vacation.Category)
                        .input("Start", mssql.Date, vacation.Start)
                        .input("End", mssql.Date, vacation.End)
                        .execute("createVacation", (err, _) => {
                          if (!err) {
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
        });
        res.json({ message: "lel" });
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
      "Пожалуйста отправьте требуемую информацию для удаления пользователя(ей)"
    );
  }
};

module.exports = createVacations;
