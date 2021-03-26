import React, { useState } from "react";
import { useFormik } from "formik";

import { createEmployeeSchema } from "../../helpers/validationSchemas";
import Steps from "../steps/Steps";

const CreateEmployee = () => {
  const [step, setStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      gender: "DEFAULT",
      birthday: "",
      passportSerial: "",
      passportNumber: "",
      passportDate: "",
      passportFrom: "",
      contactPhone: "",
      contactEmail: "",
      contactAddress: "",
      jobId: "DEFAULT",
      depId: "DEFAULT",
    },
    validationSchema: createEmployeeSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      Object.keys(values).forEach((key) => formData.append(key, values[key]));

      fetch("http://localhost:8080/employees", {
        method: "POST",
        body: formData,
        credentials: "include",
      })
        .then((res) =>
          res
            .json()
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
        )
        .catch((err) => console.log(err));
    },
  });

  return (
    <main className="container p-4">
      <header></header>
      <form
        method="POST"
        encType="multipart/form-data"
        onSubmit={formik.handleSubmit}
        className="col-lg-6 m-auto shadow-sm p-5 rounded overflow-hidden"
      >
        <Steps data={{ step, setStep, formik }} />
      </form>
      <footer></footer>
    </main>
  );
};

export default CreateEmployee;
