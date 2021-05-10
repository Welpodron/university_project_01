import React, { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";

import renderError from "../components/errors/renderError";

import { createEmployeeSchema } from "../helpers/validationSchemas";

import { getEmployee } from "../requests/requests";

import { useFormik } from "formik";

import InputGroup from "../components/steps/Groups/InputGroup";
import SelectGroup from "../components/steps/Groups/SelectGroup";
import TextareaGroup from "../components/steps/Groups/TextareaGroup";

import { getDepartments, getJobs } from "../requests/requests";

import "./styles/EmployeePage.css";

const Employee = (props) => {
  const data = { ...props.data };
  const { userId, userRole } = data;

  const [departments, setDepartments] = useState([]); // Отделы
  const [jobs, setJobs] = useState([]); // Должности

  useEffect(() => {
    getDepartments().then((d) =>
      setDepartments(d.map((dep) => ({ value: dep.Id, placeholder: dep.Name })))
    ); // Запрос к бд для должностей
    getJobs().then((d) =>
      setJobs(d.map((job) => ({ value: job.Id, placeholder: job.Name })))
    ); //Запрос к бд для работ
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: data.FirstName ?? "",
      lastName: data.LastName ?? "",
      middleName: data.MiddleName ?? "",
      gender: data.Gender ?? "",
      birthday: moment(data.Birthday).format("YYYY-MM-DD") ?? "",
      passportSerial: data.PassportSerial ?? "",
      passportNumber: data.PassportNumber ?? "",
      passportDate: moment(data.PassportDate).format("YYYY-MM-DD") ?? "",
      passportFrom: data.PassportFrom ?? "",
      contactPhone: data.Phone ?? "",
      contactEmail: data.Email ?? "",
      contactAddress: data.Address ?? "",
      jobId: data.JobId ?? "",
      depId: data.DepId ?? "",
    },
    validationSchema: createEmployeeSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      Object.keys(values).forEach((key) => formData.append(key, values[key]));

      // fetch("http://localhost:8080/employees", {
      //   method: "POST",
      //   body: formData,
      //   credentials: "include",
      // })
      //   .then((res) =>
      //     res
      //       .json()
      //       .then((data) => console.log(data))
      //       .catch((err) => console.log(err))
      //   )
      //   .catch((err) => console.log(err));
    },
  });

  const { errors, handleBlur, handleChange, touched, values } = formik;

  return (
    <>
      <div className="form-page">
        <div className="bg-light form-page-left">
          <div className="form-img bg-primary my-5 text-white">
            <h1>{data.Id}</h1>
          </div>
        </div>
        <form className="form" method="POST" encType="multipart/form-data">
          <section className="form-section">
            <header className="my-5">
              <h2>Общая информация</h2>
            </header>
            <div className="form-col-3">
              <InputGroup
                data={{
                  errors: errors.lastName,
                  handleBlur,
                  handleChange,
                  name: "lastName",
                  placeholder: "Фамилия",
                  required: true,
                  touched: touched.lastName,
                  type: "text",
                  value: values.lastName,
                  readOnly: userRole !== "MANAGER",
                  disabled: userRole !== "MANAGER",
                }}
              >
                Фамилия
              </InputGroup>
              <InputGroup
                data={{
                  errors: errors.firstName,
                  handleBlur,
                  handleChange,
                  name: "firstName",
                  placeholder: "Имя",
                  required: true,
                  touched: touched.firstName,
                  type: "text",
                  value: values.firstName,
                  readOnly: userRole !== "MANAGER",
                  disabled: userRole !== "MANAGER",
                }}
              >
                Имя
              </InputGroup>
              <InputGroup
                data={{
                  errors: errors.middleName,
                  handleBlur,
                  handleChange,
                  name: "middleName",
                  placeholder: "Отчество сотрудника",
                  required: false,
                  touched: touched.middleName,
                  type: "text",
                  value: values.middleName,
                  readOnly: userRole !== "MANAGER",
                  disabled: userRole !== "MANAGER",
                }}
              >
                Отчество
              </InputGroup>
            </div>
            <div className="form-col-2">
              <SelectGroup
                data={{
                  errors: errors.gender,
                  handleBlur,
                  handleChange,
                  name: "gender",
                  placeholder: "Пол сотрудника",
                  required: true,
                  touched: touched.gender,
                  value: values.gender,
                  options: [
                    { value: "М", placeholder: "Мужской" },
                    { value: "Ж", placeholder: "Женский" },
                  ],
                  readOnly: userRole !== "MANAGER",
                  disabled: userRole !== "MANAGER",
                }}
              >
                Пол
              </SelectGroup>
              <InputGroup
                data={{
                  errors: errors.birthday,
                  handleBlur,
                  handleChange,
                  name: "birthday",
                  placeholder: "Введите/Выберете дату рождения сотрудника",
                  required: true,
                  touched: touched.birthday,
                  type: "date",
                  readOnly: userRole !== "MANAGER",
                  disabled: userRole !== "MANAGER",
                  max: moment().subtract(18, "years").format("YYYY-MM-DD"),
                  min: moment().subtract(100, "years").format("YYYY-MM-DD"),
                  value: values.birthday,
                }}
              >
                Дата рождения
              </InputGroup>
            </div>
            <hr className="my-5"></hr>
          </section>
          <section>
            <header className="my-5">
              <h2>Служебные данные</h2>
            </header>
            <div>
              <input type="hidden" value={data.Id ?? ""} readOnly />
            </div>
            <div className="form-col-2 ">
              <SelectGroup
                data={{
                  errors: errors.jobId,
                  handleBlur,
                  handleChange,
                  name: "jobId",
                  placeholder: "Должность",
                  required: true,
                  touched: touched.jobId,
                  value: values.jobId,
                  options: jobs,
                  readOnly: userRole !== "MANAGER",
                  disabled: userRole !== "MANAGER",
                }}
              >
                Должность сотрудника
              </SelectGroup>
              <SelectGroup
                data={{
                  errors: errors.depId,
                  handleBlur,
                  handleChange,
                  name: "depId",
                  placeholder: "Отдел",
                  required: true,
                  touched: touched.depId,
                  value: values.depId,
                  options: departments,
                  readOnly: userRole !== "MANAGER",
                  disabled: userRole !== "MANAGER",
                }}
              >
                Отдел
              </SelectGroup>
            </div>
            <hr className="my-5"></hr>
          </section>
          {(userId === data.Id || userRole === "MANAGER") && (
            <section>
              <header className="my-5">
                <h2>Паспортные данные</h2>
              </header>
              <div className="form-col-2 ">
                <InputGroup
                  data={{
                    errors: errors.passportSerial,
                    handleBlur,
                    handleChange,
                    name: "passportSerial",
                    placeholder: "Серия паспорта",
                    min: 1000,
                    max: 9999,
                    readOnly: userRole !== "MANAGER",
                    disabled: userRole !== "MANAGER",
                    required: true,
                    touched: touched.passportSerial,
                    type: "number",
                    value: values.passportSerial,
                  }}
                >
                  Серия
                </InputGroup>
                <InputGroup
                  data={{
                    errors: errors.passportNumber,
                    handleBlur,
                    handleChange,
                    name: "passportNumber",
                    placeholder: "Номер паспорта",
                    min: 100000,
                    max: 999999,
                    required: true,
                    readOnly: userRole !== "MANAGER",
                    disabled: userRole !== "MANAGER",
                    touched: touched.passportNumber,
                    type: "number",
                    value: values.passportNumber,
                  }}
                >
                  Номер
                </InputGroup>
              </div>
              <InputGroup
                data={{
                  errors: errors.passportDate,
                  handleBlur,
                  handleChange,
                  name: "passportDate",
                  placeholder: "Дата выдачи паспорта",
                  required: true,
                  touched: touched.passportDate,
                  type: "date",
                  readOnly: userRole !== "MANAGER",
                  disabled: userRole !== "MANAGER",
                  max: moment().format("YYYY-MM-DD"),
                  min: "1990-01-01",
                  value: values.passportDate,
                }}
              >
                Дата выдачи
              </InputGroup>
              <TextareaGroup
                data={{
                  errors: errors.passportFrom,
                  handleBlur,
                  handleChange,
                  name: "passportFrom",
                  placeholder: "Информация о представителе паспорта",
                  required: true,
                  touched: touched.passportFrom,
                  readOnly: userRole !== "MANAGER",
                  disabled: userRole !== "MANAGER",
                  value: values.passportFrom,
                }}
              >
                Паспорт выдан
              </TextareaGroup>
              <hr className="my-5"></hr>
            </section>
          )}
          <section>
            <header className="my-5">
              <h2>Контактная информация</h2>
            </header>
            <div className="form-col-2">
              <InputGroup
                data={{
                  errors: errors.contactPhone,
                  handleBlur,
                  handleChange,
                  name: "contactPhone",
                  readOnly:
                    userId === data.Id
                      ? false
                      : userRole === "MANAGER"
                      ? false
                      : true,
                  disabled:
                    userId === data.Id
                      ? false
                      : userRole === "MANAGER"
                      ? false
                      : true,
                  placeholder: "Номер телефона сотрудника",
                  required: false,
                  touched: touched.contactPhone,
                  type: "tel",
                  value: values.contactPhone,
                }}
              >
                Номер телефона
              </InputGroup>
              <InputGroup
                data={{
                  errors: errors.contactEmail,
                  handleBlur,
                  handleChange,
                  name: "contactEmail",
                  readOnly:
                    userId === data.Id
                      ? false
                      : userRole === "MANAGER"
                      ? false
                      : true,
                  disabled:
                    userId === data.Id
                      ? false
                      : userRole === "MANAGER"
                      ? false
                      : true,
                  required: true,
                  placeholder: "Email сотрудника",
                  touched: touched.contactEmail,
                  type: "email",
                  value: values.contactEmail,
                }}
              >
                Email
              </InputGroup>
            </div>
            {(userId === data.Id || userRole === "MANAGER") && (
              <TextareaGroup
                data={{
                  errors: errors.contactAddress,
                  handleBlur,
                  handleChange,
                  name: "contactAddress",
                  placeholder: "Адрес проживания сотрудника",
                  required: true,
                  readOnly:
                    userId === data.Id
                      ? false
                      : userRole === "MANAGER"
                      ? false
                      : true,
                  disabled:
                    userId === data.Id
                      ? false
                      : userRole === "MANAGER"
                      ? false
                      : true,
                  touched: touched.contactAddress,
                  value: values.contactAddress,
                }}
              >
                Адрес проживания
              </TextareaGroup>
            )}
            <hr className="my-5"></hr>
          </section>
          {userId === data.Id && (
            <section>
              <header className="my-5">
                <h2>Данные для входа в систему</h2>
              </header>
              <div>
                <label>Логин:</label>
                <input type="text" readOnly />
              </div>
              <div>
                <label>Пароль:</label>
                <input type="password" readOnly />
              </div>
            </section>
          )}
          {userId === data.Id && (
            <button className="btn btn-primary" type="button">
              Сохранить изменения
            </button>
          )}
          {userRole === "MANAGER" && (
            <button className="btn btn-primary" type="button">
              Обновить информацию сотрудника
            </button>
          )}
        </form>
      </div>
    </>
  );
};

const EmployeePage = () => {
  const [data, setData] = useState(null);

  const [user, setUser] = useState({ userId: 1, userRole: "MANAGERы" });

  const { Id } = useParams();

  useEffect(() => {
    getEmployee(Id)
      .then((d) => d.map((el) => setData(el)))
      .catch((err) => renderError(err));
  }, []);

  return <div>{data && <Employee data={{ ...data, ...user }} />}</div>;
};

export default EmployeePage;
