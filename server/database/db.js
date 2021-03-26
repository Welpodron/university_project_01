const mssql = require("mssql");

const CONFIG = {
    user: "sa",
    password: "sa",
    server: "localhost",
    database: "SampleDB",
};

const pool = new mssql.ConnectionPool(CONFIG).connect();

module.exports = pool;
