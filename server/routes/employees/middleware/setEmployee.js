const mssql = require("mssql");
const pool = require("../../../database/db");
const errHandler = require("../../../helpers/errors");
const bcrypt = require("bcrypt");

const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "jdt.w.mail@gmail.com",
      pass: "Fjdksbb4727",
    },
  })
);

const setEmployee = (req, res) => {
  if (req.body) {
    const {
      jobId,
      depId,
      lastName,
      firstName,
      middleName,
      gender,
      birthday,
      passportSerial,
      passportNumber,
      passportDate,
      passportFrom,
      contactPhone,
      contactEmail,
      contactAddress,
    } = req.body;
    pool
      .then((connection) => {
        const setEmployee = new mssql.Request(connection);
        setEmployee
          .input("JobId", mssql.Int, jobId)
          .input("DepId", mssql.Int, depId)
          .input("LastName", mssql.NVarChar(50), lastName)
          .input("FirstName", mssql.NVarChar(50), firstName)
          .input("MiddleName", mssql.NVarChar(50), middleName || null)
          .input("Gender", mssql.NChar(1), gender)
          .input("Birthday", mssql.Date, birthday)
          .input("PassportSerial", mssql.Int, passportSerial)
          .input("PassportNumber", mssql.Int, passportNumber)
          .input("PassportDate", mssql.Date, passportDate)
          .input("PassportFrom", mssql.NVarChar(150), passportFrom)
          .input("Phone", mssql.NVarChar(13), contactPhone || null)
          .input("Email", mssql.NVarChar(75), contactEmail)
          .input("Address", mssql.NVarChar(150), contactAddress)
          .execute("setEmployee", (err, result) => {
            if (!err) {
              const employeeId = result.recordset[0].Id;
              const setOrder = new mssql.Request(connection);
              setOrder
                .input("CategoryId", mssql.Int, 1)
                .execute("setOrder", (err, result) => {
                  if (!err) {
                    const orderId = result.recordset[0].Id;
                    const connectEmployeeWithOrder = new mssql.Request(
                      connection
                    );
                    connectEmployeeWithOrder
                      .input("EmployeeId", mssql.Int, employeeId)
                      .input("OrderId", mssql.Int, orderId)
                      .execute("connectEmployeeWithOrder", (err, _) => {
                        if (!err) {
                          const rndLogin = Math.random().toString(36).slice(-8);
                          const rndPassword = Math.random()
                            .toString(36)
                            .slice(-8);
                          bcrypt
                            .hash(rndPassword, 10)
                            .then((hash) => {
                              const createUser = new mssql.Request(connection);
                              createUser
                                .input("EmployeeId", mssql.Int, employeeId)
                                .input("Login", mssql.NVarChar(50), rndLogin)
                                .input("Password", mssql.NVarChar(150), hash)
                                .input(
                                  "Role",
                                  mssql.NVarChar(50),
                                  jobId === "1"
                                    ? "STAFF_SPECIALIST"
                                    : jobId === "2"
                                    ? "STAFF_EDITOR"
                                    : jobId === "3"
                                    ? "STAFF_VACATIONS_PLANNER"
                                    : "DEFAULT"
                                )
                                .execute("createUser", (err, result) => {
                                  if (!err) {
                                    const mailOptions = {
                                      from: "sender.gmail",
                                      to: contactEmail,
                                      subject: "Данные для входа в систему",
                                      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width" />
    <style type="text/css">
      * {
        margin: 0;
        padding: 0;
        font-size: 100%;
        font-family: "Avenir Next", "Helvetica Neue", "Helvetica", Helvetica,
          Arial, sans-serif;
        line-height: 1.65;
      }

      body {
        width: 100% !important;
        height: 100vh !important;
        background: #f8f8f8;
      }

      .body-wrap {
        margin: auto;
        margin-top: 25vh;
      }

      .text-center {
        text-align: center;
      }

      .text-right {
        text-align: right;
      }

      .text-left {
        text-align: left;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-bottom: 20px;
        line-height: 1.25;
      }

      h1 {
        font-size: 32px;
      }

      h2 {
        font-size: 28px;
      }

      h3 {
        font-size: 24px;
      }

      h4 {
        font-size: 20px;
      }

      h5 {
        font-size: 16px;
      }

      p,
      ul,
      ol {
        font-size: 16px;
        font-weight: normal;
        margin-bottom: 20px;
      }

      .container {
        display: block !important;
        clear: both !important;
        margin: 0 auto !important;
        max-width: 580px !important;
      }

      .container table {
        width: 100% !important;
        border-collapse: collapse;
      }

      .container .masthead {
        padding: 80px 0;
        background: #71bc37;
        color: white;
      }

      .container .masthead h1 {
        margin: 0 auto !important;
        max-width: 90%;
        text-transform: uppercase;
      }

      .container .content {
        background: white;
        padding: 30px 35px;
      }

      .container .content.footer {
        background: none;
      }

      .container .content.footer p {
        margin-bottom: 0;
        color: #888;
        text-align: center;
        font-size: 14px;
      }

      .container .content.footer a {
        color: #888;
        text-decoration: none;
        font-weight: bold;
      }

      .container .content.footer a:hover {
        text-decoration: underline;
      }

      .field {
        background-color: #f8f9fb;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <table class="body-wrap">
      <tr>
        <td class="container">
          <table>
            <tr>
              <td class="content content--body">
                <h2>Здравствуйте, ${firstName} ${lastName}</h2>
                <p>Ваши данные для входа в личный аккаунт сотрудника:</p>
                <span class="">Логин:</span>
                <div class="field">${rndLogin}</div>
                <span class="">Пароль:</span>
                <div class="field">${rndPassword}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td class="container">
          <table>
            <tr>
              <td class="content footer" align="center">
                <p>Письмо автоматически создано системой</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
                                    };
                                    transporter.sendMail(
                                      mailOptions,
                                      (err, info) => {
                                        if (err) {
                                          errHandler(
                                            res,
                                            500,
                                            err,
                                            "Произошла ошибка при работе почтового модуля"
                                          );
                                        } else {
                                          console.log(
                                            "Email sent: " + info.response
                                          );
                                          res.json({
                                            message:
                                              "Сотрудник успешно добавлен",
                                          });
                                        }
                                      }
                                    );
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
                                "Произошла ошибка при генерации хэша"
                              )
                            );
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
  } else {
    errHandler(
      res,
      400,
      null,
      "Пожалуйста отправьте требуемую информацию для создания пользователя"
    );
  }
};

module.exports = setEmployee;
