import React, { useState, useEffect, useContext } from "react";

import {
  tryToFind,
  moveEmployees,
  getDepartments,
  getJobs,
  getMoveEmployeesOrderCategories,
} from "../requests/requests";

import "./styles/MoveEmployeePage.css";
import renderError from "../components/errors/renderError";

import userContext from "../context/user";
import { check } from "../requests/auth";

const MoveEmployees = () => {
  const [user, setUser] = useContext(userContext);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [exact, setExact] = useState(false);
  const [checked, setChecked] = useState(null);
  const [departments, setDepartments] = useState([]); // Отделы
  const [jobs, setJobs] = useState([]); // Должности
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user.role !== "STAFF_SPECIALIST" && user.role !== "STAFF_EDITOR") {
      return;
    }
    getDepartments().then((d) => setDepartments(d)); // Запрос к бд для должностей
    getJobs().then((d) => setJobs(d)); //Запрос к бд для работ
    getMoveEmployeesOrderCategories().then((d) => setOrders(d));
  }, []);

  const handleInput = (evt) => {
    setSearch(evt.target.value);
    if (exact && options.length > 0 && evt.target.value.toString())
      setOptions((prev) =>
        prev.filter((el) => el.Id.toString() === evt.target.value.toString())
      );
    if (evt.target.value.toString().length === 0) setOptions([]);
    if (evt.target.value.toString().length > 0) {
      tryToFind(evt.target.value.toString().toLowerCase(), exact).then((d) =>
        setOptions(d)
      );
    }
  };

  const handleClick = (evt) => {
    setChecked((prev) => {
      if (prev) {
        if (!prev.some((el) => el.Id.toString() === evt.target.value)) {
          return [
            ...prev,
            {
              ...options.find((el) => el.Id.toString() === evt.target.value),
              NewDepartment: options.find(
                (el) => el.Id.toString() === evt.target.value
              ).DepId,
              NewJob: options.find(
                (el) => el.Id.toString() === evt.target.value
              ).JobId,
              MoveByOrder: "3",
            },
          ];
        } else {
          return [...prev];
        }
      } else {
        return [
          {
            ...options.find((el) => el.Id.toString() === evt.target.value),
            NewDepartment: options.find(
              (el) => el.Id.toString() === evt.target.value
            ).DepId,
            NewJob: options.find((el) => el.Id.toString() === evt.target.value)
              .JobId,
            MoveByOrder: "3",
          },
        ];
      }
    });
  };

  const removeChecked = (evt) => {
    setChecked((prev) =>
      prev.filter((el) => el.Id.toString() !== evt.target.value)
    );
  };

  const handleChange = (evt) => {
    const elIndex = checked.findIndex(
      (el) => el.Id.toString() === evt.target.id.split("_")[1]
    );

    const temp = [...checked];

    if (evt.target.id.split("_")[0] === "NewDepartment")
      temp[elIndex] = {
        ...temp[elIndex],
        NewDepartment: evt.target.value,
      };

    if (evt.target.id.split("_")[0] === "NewJob")
      temp[elIndex] = {
        ...temp[elIndex],
        NewJob: evt.target.value,
      };

    if (evt.target.id.split("_")[0] === "MoveByOrder")
      temp[elIndex] = {
        ...temp[elIndex],
        MoveByOrder: evt.target.value,
      };

    setChecked(temp);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    moveEmployees(new FormData(evt.target))
      .then((d) => console.log(d))
      .catch();
  };

  return (
    <>
      {options &&
        (user.role === "STAFF_SPECIALIST" || user.role === "STAFF_EDITOR") && (
          <div className="form-page">
            <div className="bg-light form-search-left">
              <div>
                <div>
                  <input
                    className="form-control my-5"
                    type="search"
                    value={search}
                    onInput={handleInput}
                  />
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={exact}
                    onChange={() => setExact((prev) => !prev)}
                  />
                  <label className="form-check-label">
                    Искать сотрудника строго по табельному номеру
                  </label>
                </div>
              </div>
              {options.length > 0 && (
                <div>
                  <h2 className="my-5">Найденные сотрудники:</h2>
                </div>
              )}
              <ul className="found-list">
                {options.map((option) => (
                  <li>
                    <button
                      key={option.Id}
                      value={option.Id}
                      onClick={handleClick}
                      className="btn btn-primary"
                      type="button"
                    >
                      {option.Id}: {option.LastName}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {checked &&
              checked.length > 0 &&
              departments.length > 0 &&
              jobs.length > 0 && (
                <form className="form" onSubmit={handleSubmit}>
                  <div className="my-5">
                    {checked && checked.length > 0 && (
                      <div>
                        <h2 className="my-5">Выбранные сотрудники:</h2>
                        <ul className="grid-list">
                          {checked.map((el) => (
                            <li
                              className="grid-item bg-primary text-white"
                              key={el.Id}
                            >
                              {el.LastName}
                              <button
                                value={el.Id}
                                type="button"
                                onClick={removeChecked}
                                className="btn-close btn-close-white"
                              ></button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div
                    className="alert alert-warning d-flex align-items-center"
                    role="alert"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-exclamation-triangle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    <div>
                      Пожалуйста, перед переводом сотрудников убедитесь в
                      корректности заполненных данных
                    </div>
                  </div>
                  {checked.map((el) => (
                    <section key={el.Id}>
                      <header className="my-5">
                        <h3>
                          {`${el.LastName} ${el.FirstName} ${
                            el.MiddleName ? el.MiddleName : ""
                          } `}
                          <span className="badge bg-primary rounded-pill">
                            {el.Id}
                          </span>
                        </h3>
                      </header>
                      <div className="mb-2">
                        <p>
                          Фамилия:{" "}
                          <span className="badge bg-dark p-2">
                            {el.LastName}
                          </span>
                        </p>
                      </div>
                      <div className="mb-2">
                        <p>
                          Имя:{" "}
                          <span className="badge bg-dark p-2">
                            {el.FirstName}
                          </span>
                        </p>
                      </div>
                      {el.MiddleName && (
                        <div className="mb-2">
                          <p>
                            Отчество:{" "}
                            <span className="badge bg-dark p-2">
                              {el.MiddleName}
                            </span>
                          </p>
                        </div>
                      )}
                      <div className="mb-2">
                        <p>
                          Серия и номер паспорта:{" "}
                          <span className="badge bg-dark p-2">{`${el.PassportSerial} ${el.PassportNumber}`}</span>
                        </p>
                      </div>
                      <div className="mb-2">
                        <p>
                          Текущая должность:{" "}
                          <span className="badge bg-dark p-2">{el.Job}</span>
                        </p>
                      </div>
                      <div className="mb-2">
                        <p>
                          Текущий отдел:{" "}
                          <span className="badge bg-dark p-2">{el.Dep}</span>
                        </p>
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Новый отдел:</label>
                        <select
                          id={`NewDepartment_${el.Id}`}
                          name={`NewDepartment_${el.Id}`}
                          value={el.NewDepartment}
                          className="form-select"
                          onChange={handleChange}
                          required
                        >
                          {departments.map((department) => (
                            <option value={department.Id}>
                              {department.Name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Новая должность:</label>
                        <select
                          id={`NewJob_${el.Id}`}
                          name={`NewJob_${el.Id}`}
                          value={el.NewJob}
                          onChange={handleChange}
                          className="form-select"
                          required
                        >
                          {jobs.map((job) => (
                            <option value={job.Id}>{job.Name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-2">
                        <label className="form-label">
                          Переместить сотрудника согласно приказу:
                        </label>
                        <select
                          id={`MoveByOrder_${el.Id}`}
                          name={`MoveByOrder_${el.Id}`}
                          value={el.MoveByOrder}
                          onChange={handleChange}
                          className="form-select"
                          required
                        >
                          {orders.map((order) => (
                            <option value={order.Id}>{order.Name}</option>
                          ))}
                        </select>
                      </div>
                      <hr className="my-5"></hr>
                    </section>
                  ))}
                  <button className="btn btn-danger" type="submit">
                    Создать приказ о переводе выбранного(ых) сотрудника(ов), а
                    также переместить выбранного(ых) сотрудника(ов)
                  </button>
                </form>
              )}
          </div>
        )}
    </>
  );
};

export default MoveEmployees;
