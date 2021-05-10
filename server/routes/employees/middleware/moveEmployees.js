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
    console.log(updatesArr);
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

module.exports = moveEmployees;
