import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import { getDepartments, getJobs } from "../../requests/requests";
import { useFormik } from "formik";
import InputGroup from "../../components/steps/Groups/InputGroup";
import SelectGroup from "../../components/steps/Groups/SelectGroup";
import TextareaGroup from "../../components/steps/Groups/TextareaGroup";
import userContext from "../../context/user";
import { check } from "../../requests/auth";
import { updateEmployeeSchema } from "../../helpers/validationSchemas";
import { getEmployee, updateEmployee } from "../../requests/requests";

import renderError from "../../components/errors/renderError";

const EmployeeForm = (props) => {
  const [user, setUser] = useContext(userContext);
  const data = { ...props.data };
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
      employeeId: data.Id ?? "",
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
    },
    validationSchema: updateEmployeeSchema,
    onSubmit: (values, { setSubmitting }) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => formData.append(key, values[key]));
      updateEmployee(formData)
        .then((d) => {
          console.log(d);
          setSubmitting(false);
          renderError(d.message);
        })
        .catch((_) => {
          setSubmitting(false);
        });
    },
  });

  const {
    errors,
    handleBlur,
    handleChange,
    touched,
    values,
    handleSubmit,
    isSubmitting,
  } = formik;

  return (
    <>
      <div className="form-page">
        <div className="bg-light form-page-left">
          <div className="form-img bg-primary my-5 text-white">
            <h1>{data.Id}</h1>
          </div>
        </div>
        <form className="form" onSubmit={handleSubmit}>
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
                  readOnly:
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : true,
                  disabled:
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : true,
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
                  readOnly:
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : true,
                  disabled:
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : true,
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
                  readOnly:
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : true,
                  disabled:
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : true,
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
                  readOnly:
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : true,
                  disabled:
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : true,
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
                  readOnly:
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : true,
                  disabled:
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : true,
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
          {/* Добавить и самого пользователя */}
          {(user.role === "STAFF_SPECIALIST" ||
            user.role === "STAFF_EDITOR") && (
            <section>
              <header className="my-5">
                <h2>Служебные данные</h2>
              </header>
              <div>
                <input
                  name="employeeId"
                  type="hidden"
                  value={values.employeeId}
                  readOnly
                />
                <div className="mb-3">
                  <label className="form-label">Отдел</label>
                  <input
                    className="form-control"
                    type="text"
                    value={data.Dep ?? ""}
                    readOnly
                    disabled
                  />
                </div>
                <div className="mb-3">
                  {" "}
                  <label className="form-label">Должность</label>
                  <input
                    className="form-control"
                    type="text"
                    value={data.Job ?? ""}
                    readOnly
                    disabled
                  />
                </div>
              </div>
              <div className="form-col-2"></div>
              <hr className="my-5"></hr>
            </section>
          )}
          {(user.role === "STAFF_SPECIALIST" ||
            user.role === "STAFF_EDITOR") && (
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
                    readOnly:
                      user.role === "STAFF_SPECIALIST"
                        ? false
                        : user.role === "STAFF_EDITOR"
                        ? false
                        : true,
                    disabled:
                      user.role === "STAFF_SPECIALIST"
                        ? false
                        : user.role === "STAFF_EDITOR"
                        ? false
                        : true,
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
                    readOnly:
                      user.role === "STAFF_SPECIALIST"
                        ? false
                        : user.role === "STAFF_EDITOR"
                        ? false
                        : true,
                    disabled:
                      user.role === "STAFF_SPECIALIST"
                        ? false
                        : user.role === "STAFF_EDITOR"
                        ? false
                        : true,
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
                  readOnly:
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : true,
                  disabled:
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : true,
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
                  readOnly:
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : true,
                  disabled:
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : true,
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
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : user.employeeId === data.Id
                      ? false
                      : true,
                  disabled:
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : user.employeeId === data.Id
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
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : user.employeeId === data.Id
                      ? false
                      : true,
                  disabled:
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : user.employeeId === data.Id
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
            {(user.role === "STAFF_SPECIALIST" ||
              user.role === "STAFF_EDITOR") && (
              <TextareaGroup
                data={{
                  errors: errors.contactAddress,
                  handleBlur,
                  handleChange,
                  name: "contactAddress",
                  placeholder: "Адрес проживания сотрудника",
                  required: true,
                  readOnly:
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : user.employeeId === data.Id
                      ? false
                      : true,
                  disabled:
                    user.role === "STAFF_SPECIALIST"
                      ? false
                      : user.role === "STAFF_EDITOR"
                      ? false
                      : user.employeeId === data.Id
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
          {user.employeeId === data.Id &&
            user.role !== "STAFF_SPECIALIST" &&
            user.role !== "STAFF_EDITOR" && (
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                Сохранить изменения
              </button>
            )}
          {(user.role === "STAFF_SPECIALIST" ||
            user.role === "STAFF_EDITOR") && (
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Обновить информацию сотрудника
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default EmployeeForm;
