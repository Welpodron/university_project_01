import React from "react";

const Employee = (props) => {
  const { Department, FirstName, LastName, MiddleName, Job } = props.data;

  return (
    <li>
      <p>{Department}</p>
      <p>{`${LastName} ${FirstName} ${MiddleName || ""}`}</p>
      <p>{Job}</p>
    </li>
  );
};

export default Employee;
