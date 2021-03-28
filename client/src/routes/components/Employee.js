import React from "react";

import { Link } from "react-router-dom";

const Employee = (props) => {
  const { Id, Department, FirstName, LastName, MiddleName, Job } = props.data;

  return (
    <>
      <Link to={`/employees/${Id}`}>
        <li>
          <p>{Department}</p>
          <p>{`${LastName} ${FirstName} ${MiddleName || ""}`}</p>
          <p>{Job}</p>
        </li>
      </Link>
    </>
  );
};

export default Employee;
