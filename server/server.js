const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const auth = require(__dirname + "/routes/auth/auth");
const employees = require(__dirname + "/routes/employees/employees");
const orders = require(__dirname + "/routes/orders/orders");
const api = require(__dirname + "/api/api");

app.use("/api", api);
app.use("/auth", auth);
app.use("/employees", employees);
app.use("/orders", orders);

app.listen(process.env.PORT || 8080);