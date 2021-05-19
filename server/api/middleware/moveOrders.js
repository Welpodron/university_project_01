const mssql = require("mssql");

const pool = require("../../database/db");
const errHandler = require("../../helpers/errors");

const moveOrders = (req, res) => {
  pool
    .then((connection) => {
      const getMoveOrders = new mssql.Request(connection);
      getMoveOrders.execute(
        "getMoveEmployeesOrderCategories",
        (err, result) => {
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
        }
      );
    })
    .catch((err) =>
      errHandler(
        res,
        500,
        err,
        "Произошла ошибка при подключении к базе данных сервера"
      )
    );
};

module.exports = moveOrders;
