import React, { useEffect, useState } from "react";

import renderError from "../components/errors/renderError";

import { getEmployees } from "../requests/requests";

import Employees from "./components/Employees";

import "./styles/EmployeesPage.css";

import {
  numSort,
  stringSort,
  multipleSort,
  nullSort,
} from "../helpers/sorting";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState(null);

  const [q, setQ] = useState("");
  const [options, setOptions] = useState(null);
  const [optionsActive, setOptionsActive] = useState(null);

  const [sortOptionsActive, setSortOptionsActive] = useState([]);

  useEffect(() => {
    getEmployees(20)
      .then((d) => setEmployees(d))
      .catch((err) => renderError(err));
  }, []);

  useEffect(() => {
    if (!employees) return;
    if (options) return;
    setOptions(Object.keys(employees[0]));
    setOptionsActive(Object.keys(employees[0]));
  }, [employees]);

  const search = (d) => {
    if (optionsActive && optionsActive.length === 0)
      return sortOptionsActive.length > 0
        ? multipleSort(d, sortOptionsActive)
        : d;
    const temp = d.filter((el) =>
      optionsActive.some(
        (field) =>
          el[field] &&
          el[field].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
    // Проводим сортировку если она нужна
    return sortOptionsActive.length > 0
      ? multipleSort(temp, sortOptionsActive)
      : temp;
  };

  const translate = (name) => {
    switch (name) {
      case "FirstName":
        return "Имя";
      case "LastName":
        return "Фамилия";
      case "MiddleName":
        return "Отчество";
      case "Department":
        return "Отдел";
      case "Job":
        return "Должность";
      case "Id":
        return "Табельный номер сотрудника";
      default:
        return "Неизвестное поле";
    }
  };

  const getSortFunctionByType = (type) => {
    switch (type) {
      case "string":
        return stringSort;
      case "number":
        return numSort;
      default:
        return nullSort;
    }
  };

  const tryToGetSortingFunc = (field) => {
    if (employees[0][field] === null) {
      const tryToFind = employees.find((el) => el[field] !== null);
      return tryToFind
        ? getSortFunctionByType(typeof tryToFind[field])
        : nullSort;
    }
    return getSortFunctionByType(typeof employees[0][field]);
  };

  return (
    <div>
      {employees && options && optionsActive && (
        <form className="p-5">
          <div className="form-search input-group">
            <input
              className="form-control form-search-search"
              type="search"
              placeholder="Поиск сотрудников"
              onChange={(e) => setQ(e.target.value)}
              value={q}
            />
            <div className="form-search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
            <div className="from-drop-cont">
              <button
                class="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-funnel-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
                </svg>
              </button>
              <div class="collapse form-drop" id="collapseExample">
                <ul class="form-filters shadow rounded">
                  {options.map((opt, i) => (
                    <li className="">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={optionsActive.includes(opt)}
                          onChange={(e) => {
                            const checked = optionsActive.includes(opt);
                            setOptionsActive((prev) =>
                              checked
                                ? prev.filter((option) => option !== opt)
                                : [...prev, opt]
                            );
                          }}
                        />
                        <label className="form-check-label" key={i}>
                          {translate(opt)}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <ul>
            {options.map((opt, i) => (
              <li>
                <label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={sortOptionsActive.some((el) => el.field === opt)}
                    onChange={(e) => {
                      const checked = sortOptionsActive.some(
                        (el) => el.field === opt
                      );
                      setSortOptionsActive((prev) =>
                        checked
                          ? prev.filter((option) => option.field !== opt)
                          : [
                              ...prev,
                              {
                                field: opt,
                                descending: false,
                                sortFunction: tryToGetSortingFunc(opt),
                              },
                            ]
                      );
                    }}
                  />
                  {`Сортировать по: ${translate(opt)}`}
                </label>
                {sortOptionsActive.some((el) => el.field === opt) && (
                  <>
                    <label>
                      <input
                        type="radio"
                        name={opt}
                        checked={sortOptionsActive.some(
                          (el) => el.field === opt && !el.descending
                        )}
                        onChange={(e) => {
                          setSortOptionsActive((prev) => {
                            const temp = [...prev];
                            const i = temp.findIndex(
                              (el) => el.field === e.target.name
                            );
                            temp[i] = { ...temp[i], descending: false };
                            return temp;
                          });
                        }}
                      />
                      По возрастанию
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={opt}
                        checked={sortOptionsActive.some(
                          (el) => el.field === opt && el.descending
                        )}
                        onChange={(e) => {
                          setSortOptionsActive((prev) => {
                            const temp = [...prev];
                            const i = temp.findIndex(
                              (el) => el.field === e.target.name
                            );
                            temp[i] = { ...temp[i], descending: true };
                            return temp;
                          });
                        }}
                      />
                      По убыванию
                    </label>
                  </>
                )}
              </li>
            ))}
          </ul>
        </form>
      )}
      {employees && options && optionsActive && (
        <Employees data={search(employees)} />
      )}
    </div>
  );
};

export default EmployeesPage;
