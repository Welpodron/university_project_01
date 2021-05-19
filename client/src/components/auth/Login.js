import React, { useContext } from "react";

import { Redirect } from "react-router-dom";

import { Formik } from "formik";

import { login as loginRequest } from "../../requests/auth";

import renderError from "../errors/renderError";

import userContext from "../../context/user";

import "./style/Login.css";

const Login = () => {
  const [user, setUser] = useContext(userContext);

  return (
    <Formik
      initialValues={{ login: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        console.log("yes");
        const formData = new FormData();

        Object.keys(values).forEach((key) => formData.append(key, values[key]));

        loginRequest(formData)
          .then((d) => {
            console.log(d);
            setUser({ role: d.role, employeeId: d.employeeId });
            setSubmitting(false);
            renderError("Пользователь успешно авторизован");
          })
          .catch((_) => {
            setSubmitting(false);
          });
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <div className="login-page bg-light">
          <form className="login-form p-5" onSubmit={handleSubmit}>
            <h1 className="h2 mb-4">Авторизация</h1>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                name="login"
                id="login"
                onChange={handleChange}
                value={values.login}
                placeholder="Логин"
              />
              <label htmlFor="login">Логин</label>
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={handleChange}
                value={values.password}
                placeholder="Пароль"
              />
              <label htmlFor="password">Пароль</label>
            </div>
            <button
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Войти
            </button>
            <p className="mt-5 mb-3 text-muted">
              2021 made by <a href="https://vk.com/welpodron">@welpodron</a>
            </p>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default Login;
