import React, { useEffect, useState } from "react";

import renderError from "../components/errors/renderError";

import { getEmployees } from "../requests/requests";

import Employees from "./components/Employees";

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
        <form>
          <input type="text" onChange={(e) => setQ(e.target.value)} value={q} />
          {options.map((opt, i) => (
            <label key={i}>
              <input
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
              {translate(opt)}
            </label>
          ))}
          <ul>
            {options.map((opt, i) => (
              <li>
                <label>
                  <input
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
