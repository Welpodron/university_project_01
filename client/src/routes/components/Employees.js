import React from "react";

import Employee from "./Employee";

import "./styles/Employees.css";

const Employees = ({ data }) => {
  return (
    <ul className="employees-list p-5">
      {data.map((el) => (
        <Employee key={el.Id} data={el} />
      ))}
    </ul>
  );
};

export default Employees;
