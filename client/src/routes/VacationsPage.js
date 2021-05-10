import React, { useContext, useEffect, useState } from "react";

import renderError from "../components/errors/renderError";

import { getVacations } from "../requests/requests";

import moment from "moment";

import "./styles/VacationsPage.css";

const VacationsPage = () => {
  const [vacations, setVacations] = useState(null);

  useEffect(() => {
    getVacations()
      .then((d) => setVacations(d))
      .catch((err) => renderError(err));
  }, []);

  return (
    <table className="vacations-table p-5">
      <thead className="vacations-table-head">
        <tr className="vacations-table-head-row shadow-sm p-3 bg-body rounded">
          <th className="vacations-table-cell" scope="col">
            Сотрудник
          </th>
          <th className="vacations-table-cell fw-light" scope="col">
            Категория
          </th>
          <th className="vacations-table-cell fw-light" scope="col">
            Количество дней
          </th>
          <th className="vacations-table-cell" scope="col">
            Дата начала
          </th>
          <th className="vacations-table-cell" scope="col">
            Дата окончания
          </th>
        </tr>
      </thead>
      <tbody className="vacations-table-body">
        {vacations &&
          vacations.map((el) => (
            <tr className="vacations-table-body-row shadow-sm p-3 bg-body rounded">
              <td className="vacations-table-cell">
                <b>
                  <span class="badge bg-primary">{el.Id}</span>{" "}
                  {`${el.LastName} ${el.FirstName} ${
                    el.MiddleName ? el.MiddleName : ""
                  }`}
                </b>
              </td>
              <td className="vacations-table-cell fw-light">{el.Category}</td>
              <td className="vacations-table-cell fw-light">
                {moment(el.End).diff(moment(el.Start), "days")}
              </td>
              <td className="vacations-table-cell">
                <span class="badge bg-warning text-dark">
                  {new Date(el.Start).toLocaleDateString()}
                </span>
              </td>
              <td className="vacations-table-cell">
                <span class="badge bg-warning text-dark">
                  {new Date(el.End).toLocaleDateString()}
                </span>
              </td>
            </tr>
          ))}
      </tbody>
      {/* {orders && orders.map((el) => <Order key={el.Id} data={el} />)} */}
    </table>
  );
};

export default VacationsPage;
