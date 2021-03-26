import React, { useContext } from "react";

import { Formik } from "formik";

import { login as loginRequest } from "../../requests/auth";

import userContext from "../../context/user";

const Login = () => {
  const [setUser] = useContext(userContext);

  return (
    <Formik
      initialValues={{ login: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        const formData = new FormData();

        Object.keys(values).forEach((key) => formData.append(key, values[key]));

        loginRequest(formData)
          .then((d) => {
            setUser({ role: d.role });
            setSubmitting(false);
          })
          .catch((_) => {
            setSubmitting(false);
          });
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="login"
            onChange={handleChange}
            value={values.login}
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default Login;
