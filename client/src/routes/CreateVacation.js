import React, { useState } from "react";

import { tryToFind, createVacations } from "../requests/requests";

import moment from "moment";

const CreateVacation = () => {
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
              Category: "1",
              Start: moment().format("YYYY-MM-DD"),
              End: moment().add(1, "months").format("YYYY-MM-DD"),
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
            Start: moment().format("YYYY-MM-DD"),
            End: moment().add(1, "months").format("YYYY-MM-DD"),
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

    console.log(evt.target.value);
    console.log(evt.target.id.split("_")[0] === "End");

    if (evt.target.id.split("_")[0] === "Start")
      temp[elIndex] = { ...temp[elIndex], Start: evt.target.value };
    if (evt.target.id.split("_")[0] === "End")
      temp[elIndex] = { ...temp[elIndex], End: evt.target.value };
    if (evt.target.id.split("_")[0] === "Category")
      temp[elIndex] = {
        ...temp[elIndex],
        Category: evt.target.value,
      };

    setChecked(temp);
    // Необходимо найти в массиве checked соответсвующий
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    createVacations(new FormData(evt.target))
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
              <ul>
                {checked.map((el) => (
                  <li key={el.Id}>
                    <h3>{`Сотрудник: ${el.LastName} ${el.FirstName} ${
                      el.MiddleName ? el.MiddleName : ""
                    } (табельный номер: ${el.Id})`}</h3>
                    <div>
                      <label>Категория отпуска:</label>
                      <select
                        id={`Category_${el.Id}`}
                        name={`Category_${el.Id}`}
                        value={el.Category}
                        onChange={handleChange}
                        required
                      >
                        <option value="1">
                          Ежегодный (основной) оплачиваемый отпуск
                        </option>
                        <option value="2">
                          Ежегодный дополнительный оплачиваемый отпуск (в т. ч.
                          учебный)
                        </option>
                        <option value="3">
                          Отпуск без сохранения заработной платы
                        </option>
                        <option value="4">
                          Отпуск по беременности и родам (декретный отпуск)
                        </option>
                        <option value="5">Отпуск по уходу за ребенком</option>
                      </select>
                    </div>
                    <div>
                      <label>Дата начала:</label>
                      <input
                        type="date"
                        id={`Start_${el.Id}`}
                        name={`Start_${el.Id}`}
                        value={el.Start}
                        min={moment().format("YYYY-MM-DD")}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label>Дата окончания:</label>
                      <input
                        type="date"
                        id={`End_${el.Id}`}
                        name={`End_${el.Id}`}
                        value={el.End}
                        min={moment().add(1, "days").format("YYYY-MM-DD")}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <button type="submit">
                Создать приказ о создании отпуска для выбранного(ых)
                сотрудника(ов)
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default CreateVacation;
