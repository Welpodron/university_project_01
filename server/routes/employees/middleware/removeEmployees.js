const mssql = require("mssql");
const pool = require("../../../database/db");
const errHandler = require("../../../helpers/errors");

const removeEmployees = (req, res) => {
  if (req.body) {
    pool
      .then((connection) => {
        const employeesToDelete = [];
        const objArr = Object.entries(req.body);
        objArr.forEach((arr) => {
          const fieldAndId = arr.shift().split("_");
          const value = arr.pop();
          arr.push({
            EmployeeId: fieldAndId[1],
            [fieldAndId[0]]: value,
          });
        });
        objArr.forEach((arr) => {
          const thisObj = arr[0];
          const next = objArr.find(
            (el) =>
              el[0].EmployeeId === arr[0].EmployeeId &&
              el[0].hasOwnProperty("ReasonCategory")
          )[0];
          if (!yes.some((obj) => obj.EmployeeId === thisObj.EmployeeId))
            employeesToDelete.push(Object.assign(thisObj, next));
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

module.exports = removeEmployees;
