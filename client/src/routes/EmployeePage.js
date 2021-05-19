import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import renderError from "../components/errors/renderError";
import { getEmployee, updateEmployee } from "../requests/requests";
import "./styles/EmployeePage.css";
import EmployeeForm from "./components/EmployeeForm";
const EmployeePage = () => {
  const [data, setData] = useState(null);

  const { Id } = useParams();

  useEffect(() => {
    getEmployee(Id)
      .then((d) => d.map((el) => setData(el)))
      .catch((err) => renderError(err));
  }, []);

  return <div>{data && <EmployeeForm data={data} />}</div>;
};

export default EmployeePage;
