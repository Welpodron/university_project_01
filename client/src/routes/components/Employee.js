import React from "react";

import { Link } from "react-router-dom";

const Employee = (props) => {
  const { Id, Department, FirstName, LastName, MiddleName, Job } = props.data;

  return (
    <>
      <Link to={`/employees/${Id}`}>
        <li className="employee shadow rounded p-4">
          <div>
            <span className="badge bg-secondary">{Id}</span>
          </div>
          <ul className="badges">
            <li className="badges-badge shadow-sm rounded fw-light text-muted">
              {Department}
            </li>
          </ul>
          <div className="">
            <h5 className="">{`${LastName} ${FirstName} ${
              MiddleName || ""
            }`}</h5>
          </div>
          <ul className="badges">
            <li className="badges-badge shadow-sm rounded fw-light text-muted">
              {Job}
            </li>
          </ul>
        </li>
      </Link>
    </>
  );
};

export default Employee;
