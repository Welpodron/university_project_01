import React from "react";

import Employee from "./Employee";

const Employees = ({ data }) => {
  return (
    <ul>
      {data.map((el) => (
        <Employee key={el.Id} data={el} />
      ))}
    </ul>
  );
};

export default Employees;
