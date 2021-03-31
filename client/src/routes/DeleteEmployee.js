import React, { useState } from "react";

import { tryToFind, deleteEmployees } from "../requests/requests";

const DeleteEmployee = () => {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [exact, setExact] = useState(false);
  const [checked, setChecked] = useState(null);

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
              Reason: "Увольнение сотрудника по собственному желанию",
              ReasonCategory: "5",
            },
          ];
        } else {
          return [...prev];
        }
      } else {
        return [
          {
            ...options.find((el) => el.Id.toString() === evt.target.value),
            Reason: "Увольнение сотрудника по собственному желанию",
            ReasonCategory: "5",
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
    //evt.target.id.split("_")[1]
    const elIndex = checked.findIndex(
      (el) => el.Id.toString() === evt.target.id.split("_")[1]
    );

    const temp = [...checked];

    evt.target.id.split("_")[0] === "Reason"
      ? (temp[elIndex] = { ...temp[elIndex], Reason: evt.target.value })
      : (temp[elIndex] = {
          ...temp[elIndex],
          ReasonCategory: evt.target.value,
        });
    setChecked(temp);
    // Необходимо найти в массиве checked соответсвующий
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    deleteEmployees(new FormData(evt.target))
      .then((d) => console.log(d))
      .catch();
  };

  return (
    <>
      {options && (
        <div>
          <input type="text" value={search} onInput={handleInput} />
          <label>
            <input
              type="checkbox"
              checked={exact}
              onChange={() => setExact((prev) => !prev)}
            />
            Искать сотрудника строго по табельному номеру
          </label>
          {options.map((option) => (
            <button
              key={option.Id}
              value={option.Id}
              onClick={handleClick}
              type="button"
            >
              {option.LastName}
            </button>
          ))}
          {checked && checked.length > 0 && (
            <div>
              <h2>Выбранные сотрудники:</h2>
              <ul>
                {checked.map((el) => (
                  <li key={el.Id}>
                    {el.LastName}
                    <button value={el.Id} type="button" onClick={removeChecked}>
                      Удалить из выбранных
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {checked && checked.length > 0 && (
            <form onSubmit={handleSubmit}>
              <h2>Данные выбранных сотрудников:</h2>
              <p>
                Пожалуйста, перед увольнением сотрудников убедитесь в
                корректности заполненных данных
              </p>
              <ul>
                {checked.map((el) => (
                  <li key={el.Id}>
                    <h3>{`Сотрудник: ${el.LastName} ${el.FirstName} ${
                      el.MiddleName ? el.MiddleName : ""
                    } (табельный номер: ${el.Id})`}</h3>
                    <p>{`Фамилия: ${el.LastName}`}</p>
                    <p>{`Имя: ${el.FirstName}`}</p>
                    {el.MiddleName && <p>{`Отчество: ${el.MiddleName}`}</p>}
                    <p>{`Серия и номер паспорта: ${el.PassportSerial} ${el.PassportNumber}`}</p>
                    <p>{`Должность: ${el.Job}`}</p>
                    <p>{`Отдел: ${el.Dep}`}</p>
                    <p>{`Зарплата: ${el.Payment}`}</p>
                    <div>
                      <label>Причина увольнения:</label>
                      <textarea
                        id={`Reason_${el.Id}`}
                        name={`Reason_${el.Id}`}
                        value={el.Reason}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label>Категория приказа:</label>
                      <select
                        id={`ReasonCategory_${el.Id}`}
                        name={`ReasonCategory_${el.Id}`}
                        value={el.ReasonCategory}
                        onChange={handleChange}
                        required
                      >
                        <option value="5">
                          Увольнение по инициативе работника
                        </option>
                        <option value="6">
                          Увольнение по инициативе работодателя
                        </option>
                        <option value="7">Увольнение по обстоятельствам</option>
                      </select>
                    </div>
                  </li>
                ))}
              </ul>
              <button type="submit">
                Создать приказ об увольнении выбранного(ых) сотрудника(ов)
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default DeleteEmployee;
