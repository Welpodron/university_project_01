import React, { useContext, useEffect, useState } from "react";

import renderError from "../components/errors/renderError";

import { getVacations } from "../requests/requests";

import moment from "moment";

const VacationsPage = () => {
  const [vacations, setVacations] = useState(null);

  useEffect(() => {
    getVacations()
      .then((d) => setVacations(d))
      .catch((err) => renderError(err));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Сотрудник</th>
          <th scope="col">Категория</th>
          <th scope="col">Количество дней</th>
          <th scope="col">Дата начала</th>
          <th scope="col">Дата окончания</th>
          <th scope="col">Статус</th>
        </tr>
      </thead>
      <tbody>
        {vacations &&
          vacations.map((el) => (
            <tr>
              <td>{`${el.LastName} ${el.FirstName} ${
                el.MiddleName ? el.MiddleName : ""
              }`}</td>
              <td>{el.Category}</td>
              <td>{moment(el.End).diff(moment(el.Start), "days")}</td>
              <td>{new Date(el.Start).toLocaleDateString()}</td>
              <td>{new Date(el.End).toLocaleDateString()}</td>
              <td>{el.Status}</td>
            </tr>
          ))}
      </tbody>
      {/* {orders && orders.map((el) => <Order key={el.Id} data={el} />)} */}
    </table>
  );
};

export default VacationsPage;
