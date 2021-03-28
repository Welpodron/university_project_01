import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import renderError from "../components/errors/renderError";

import { getEmployee } from "../requests/requests";

const Employee = (props) => {
  const {
    Department,
    Email,
    FirstName,
    Id,
    Job,
    LastName,
    MiddleName,
    Phone,
  } = props.data;

  return (
    <div>
      <p>{`Табельный номер сотрудника: ${Id}`}</p>
      <p>{FirstName}</p>
      <p>{LastName}</p>
      <p>{MiddleName}</p>
      <p>{`Должность сотрудника: ${Job}`}</p>
      <p>{`Отдел, в котором работает сотрудник: ${Department}`}</p>
      <p>{Email}</p>
      <p>{Phone}</p>
    </div>
  );
};

const EmployeePage = () => {
  const [data, setData] = useState(null);

  const { Id } = useParams();

  useEffect(() => {
    getEmployee(Id)
      .then((d) => d.map((el) => setData(el)))
      .catch((err) => renderError(err));
  }, []);

  return <div>{data && <Employee data={data} />}</div>;
};

export default EmployeePage;
