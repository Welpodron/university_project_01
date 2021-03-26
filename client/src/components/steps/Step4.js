import React, { useEffect, useState } from "react";

import SelectGroup from "./Groups/SelectGroup";

const Step4 = (props) => {
  const {
    errors,
    handleBlur,
    handleChange,
    touched,
    values,
  } = props.data.formik;

  const { setStep } = props.data;

  const [departments, setDepartments] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/departments")
      .then((res) =>
        res
          .json()
          .then((data) =>
            setDepartments(
              data.map((department) => ({
                value: department.Id,
                placeholder: department.Name,
              }))
            )
          )
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
    fetch("http://localhost:8080/api/jobs")
      .then((res) =>
        res
          .json()
          .then((data) =>
            setJobs(
              data.map((job) => ({ value: job.Id, placeholder: job.Name }))
            )
          )
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="mb-4">
      <header className="mb-4">
        <h2 className="mb-4">Шаг 4 из 5. Заполнение служебных данных</h2>
        <p className="m-0">
          Укажите соответствующую служебную информацию сотрудника
        </p>
      </header>
      <div>
        <SelectGroup
          data={{
            errors: errors.jobId,
            handleBlur,
            handleChange,
            name: "jobId",
            placeholder: "Выберете должность сотрудника",
            required: true,
            touched: touched.jobId,
            value: values.jobId,
            options: jobs,
          }}
        >
          Должность сотрудника
        </SelectGroup>
        <SelectGroup
          data={{
            errors: errors.depId,
            handleBlur,
            handleChange,
            name: "depId",
            placeholder: "Выберете отдел сотрудника",
            required: true,
            touched: touched.depId,
            value: values.depId,
            options: departments,
          }}
        >
          Отдел
        </SelectGroup>
        <p className="my-4">
          <span className="text-danger">*</span> - обязательные к заполнению
          поля
        </p>
      </div>
      <footer className="d-flex justify-content-between align-items-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setStep((prevStep) => prevStep - 1)}
        >
          Предыдущий шаг
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setStep((prevStep) => prevStep + 1)}
          disabled={
            !Object.keys(touched).length > 0 || errors.jobId || errors.depId
          }
        >
          Следующий шаг
        </button>
      </footer>
    </section>
  );
};

export default Step4;
