import React, { useState, useEffect, useContext } from "react";

import {
  tryToFind,
  createVacations,
  getVacationsTypes,
} from "../requests/requests";

import moment from "moment";

import "./styles/CreateVacation.css";

import renderError from "../components/errors/renderError";

import userContext from "../context/user";
import { check } from "../requests/auth";

const CreateVacation = () => {
  const [user, setUser] = useContext(userContext);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [exact, setExact] = useState(false);
  const [checked, setChecked] = useState(null);

  const [vacationsTypes, setVacationsTypes] = useState([]);

  useEffect(() => {
    check()
      .then((d) => {
        d ? setUser({ role: d.role }) : setUser({ role: "GUEST" });
      })
      .catch((err) => renderError(err));

    if (
      user.role !== "STAFF_SPECIALIST" &&
      user.role !== "STAFF_VACATIONS_PLANNER"
    ) {
      window.location.href = "http://localhost:3000/login";
      return;
    }
    getVacationsTypes().then((d) => setVacationsTypes(d));
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
              Category: "1",
              Amount: 28,
              Start: moment().format("YYYY-MM-DD"),
              End: moment().add(28, "days").format("YYYY-MM-DD"),
            },
          ];
        } else {
          return [...prev];
        }
      } else {
        return [
          {
            ...options.find((el) => el.Id.toString() === evt.target.value),
            Category: "1",
            Amount: 28,
            Start: moment().format("YYYY-MM-DD"),
            End: moment().add(28, "days").format("YYYY-MM-DD"),
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

    if (evt.target.id.split("_")[0] === "Start") {
      temp[elIndex] = { ...temp[elIndex], Start: evt.target.value };
      const start = moment(evt.target.value);
      const end = moment(start).add(
        checked.find((el) => el.Id.toString() === evt.target.id.split("_")[1])
          .Amount,
        "days"
      );

      const weekends = [
        moment(`${end.year()}-01-01`),
        moment(`${end.year()}-01-02`),
        moment(`${end.year()}-01-03`),
        moment(`${end.year()}-01-04`),
        moment(`${end.year()}-01-05`),
        moment(`${end.year()}-01-06`),
        moment(`${end.year()}-01-07`),
        moment(`${end.year()}-01-08`),
        moment(`${end.year()}-02-23`),
        moment(`${end.year()}-03-08`),
        moment(`${end.year()}-05-01`),
        moment(`${end.year()}-05-09`),
        moment(`${end.year()}-06-12`),
        moment(`${end.year()}-11-04`),
      ];

      weekends.forEach((weekend) => {
        if (
          weekend.isBetween(start, end) &&
          checked.find((el) => el.Id.toString() === evt.target.id.split("_")[1])
            .Category !== "4"
        )
          end.add(1, "day");
      });
      //
      temp[elIndex] = { ...temp[elIndex], End: end.format("YYYY-MM-DD") };
    }

    if (evt.target.id.split("_")[0] === "Amount") {
      temp[elIndex] = {
        ...temp[elIndex],
        Amount: evt.target.value,
      };
      const start = moment(
        checked.find((el) => el.Id.toString() === evt.target.id.split("_")[1])
          .Start
      );
      const end = moment(start).add(evt.target.value, "days");

      const weekends = [
        moment(`${end.year()}-01-01`),
        moment(`${end.year()}-01-02`),
        moment(`${end.year()}-01-03`),
        moment(`${end.year()}-01-04`),
        moment(`${end.year()}-01-05`),
        moment(`${end.year()}-01-06`),
        moment(`${end.year()}-01-07`),
        moment(`${end.year()}-01-08`),
        moment(`${end.year()}-02-23`),
        moment(`${end.year()}-03-08`),
        moment(`${end.year()}-05-01`),
        moment(`${end.year()}-05-09`),
        moment(`${end.year()}-06-12`),
        moment(`${end.year()}-11-04`),
      ];

      weekends.forEach((weekend) => {
        if (weekend.isBetween(start, end)) end.add(1, "day");
      });
      //
      temp[elIndex] = { ...temp[elIndex], End: end.format("YYYY-MM-DD") };
    }

    if (evt.target.id.split("_")[0] === "Category") {
      temp[elIndex] = {
        ...temp[elIndex],
        Category: evt.target.value,
      };
      if (evt.target.value === "1" || evt.target.value === "4") {
        temp[elIndex] = {
          ...temp[elIndex],
          Amount: evt.target.value === "1" ? 28 : 140,
        };
        const start = moment(
          checked.find((el) => el.Id.toString() === evt.target.id.split("_")[1])
            .Start
        );
        const end = moment(start).add(
          evt.target.value === "1" ? 28 : 140,
          "days"
        );

        const weekends = [
          moment(`${end.year()}-01-01`),
          moment(`${end.year()}-01-02`),
          moment(`${end.year()}-01-03`),
          moment(`${end.year()}-01-04`),
          moment(`${end.year()}-01-05`),
          moment(`${end.year()}-01-06`),
          moment(`${end.year()}-01-07`),
          moment(`${end.year()}-01-08`),
          moment(`${end.year()}-02-23`),
          moment(`${end.year()}-03-08`),
          moment(`${end.year()}-05-01`),
          moment(`${end.year()}-05-09`),
          moment(`${end.year()}-06-12`),
          moment(`${end.year()}-11-04`),
        ];

        weekends.forEach((weekend) => {
          if (weekend.isBetween(start, end) && evt.target.value === "1")
            end.add(1, "day");
        });
        //
        temp[elIndex] = { ...temp[elIndex], End: end.format("YYYY-MM-DD") };
      }
    }

    setChecked(temp);
    // Необходимо найти в массиве checked соответсвующий
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    checked.forEach((obj) => {
      formData.append(`Category_${obj.Id}`, obj.Category);
      formData.append(`Start_${obj.Id}`, obj.Start);
      formData.append(`End_${obj.Id}`, obj.End);
    });
    createVacations(formData)
      .then((d) => console.log(d))
      .catch();
  };

  return (
    <>
      {options &&
        (user.role === "STAFF_SPECIALIST" ||
          user.role === "STAFF_VACATIONS_PLANNER") && (
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
            {checked && checked.length > 0 && (
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
                      <label className="form-label">Категория отпуска:</label>
                      <select
                        className="form-select"
                        id={`Category_${el.Id}`}
                        name={`Category_${el.Id}`}
                        value={el.Category}
                        onChange={handleChange}
                        required
                      >
                        {vacationsTypes.length > 0 &&
                          vacationsTypes
                            .filter((vacationType) =>
                              vacationType.Id === 4 && el.Gender === "М"
                                ? false
                                : true
                            )
                            .map((vacationType) => (
                              <option value={vacationType.Id}>
                                {vacationType.Name}
                              </option>
                            ))}
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Количество дней:</label>
                      <input
                        min="1"
                        className="form-control"
                        type="number"
                        required
                        id={`Amount_${el.Id}`}
                        name={`Amount_${el.Id}`}
                        value={el.Amount}
                        onChange={handleChange}
                        readOnly={
                          el.Category === "1" || el.Category === "4"
                            ? true
                            : false
                        }
                        disabled={
                          el.Category === "1" || el.Category === "4"
                            ? true
                            : false
                        }
                      />
                    </div>
                    <div className="form-col-2">
                      <div className="mb-2">
                        <label className="form-label">Дата начала:</label>
                        <input
                          className="form-control"
                          type="date"
                          id={`Start_${el.Id}`}
                          name={`Start_${el.Id}`}
                          value={el.Start}
                          min={moment().format("YYYY-MM-DD")}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Дата окончания:</label>
                        <input
                          type="date"
                          className="form-control"
                          id={`End_${el.Id}`}
                          name={`End_${el.Id}`}
                          value={el.End}
                          min={moment().add(1, "days").format("YYYY-MM-DD")}
                          required
                          readOnly
                          disabled
                        />
                      </div>
                    </div>
                    <hr className="my-5"></hr>
                  </section>
                ))}
                <button className="btn btn-danger" type="submit">
                  Создать приказ о создании отпуска для выбранного(ых)
                  сотрудника(ов), а также добавить отпуска в таблицу отпусков
                </button>
              </form>
            )}
          </div>
        )}
    </>
  );
};

export default CreateVacation;
