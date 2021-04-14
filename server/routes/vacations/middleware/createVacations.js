const mssql = require("mssql");
const pool = require("../../../database/db");
const errHandler = require("../../../helpers/errors");

const createVacations = (req, res) => {
  if (req.body) {
    pool
      .then((connection) => {
        const matches = [];
        const keys = new Set(
          Object.keys(req.body).map((el) => el.split("_")[1])
        );
        keys.forEach((k) => {
          let CategoryId, StartDate, EndDate;
          for (const key of Object.keys(req.body)) {
            if (key.split("_")[1] === k) {
              if (key.split("_")[0] === "Category") CategoryId = req.body[key];
              if (key.split("_")[0] === "Start") StartDate = req.body[key];
              if (key.split("_")[0] === "End") EndDate = req.body[key];
            }
          }
          matches.push({ EmployeeId: k, CategoryId, StartDate, EndDate });
        });
        matches.forEach((match) => {
          const createVacation = new mssql.Request(connection);
          createVacation
            .input("EmployeeId", mssql.Int, match.EmployeeId)
            .input("CategoryId", mssql.Int, match.CategoryId)
            .input("Start", mssql.Date, match.StartDate)
            .input("End", mssql.Date, match.EndDate)
            .execute("createVacation", (err, result) => {
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
