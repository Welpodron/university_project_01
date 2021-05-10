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
          <h1 class="h3 mb-3 fw-normal">Авторизация</h1>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              name="login"
              id="login"
              onChange={handleChange}
              value={values.login}
              placeholder="Логин"
            />
            <label for="login">Логин</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              onChange={handleChange}
              value={values.password}
              placeholder="Пароль"
            />
            <label for="password">Пароль</label>
          </div>
          <button
            class="w-100 btn btn-lg btn-primary"
            type="submit"
            disabled={isSubmitting}
          >
            Войти
          </button>
          <p class="mt-5 mb-3 text-muted">
            2021 made by <a href="https://vk.com/welpodron">@welpodron</a>
          </p>
        </form>
      )}
    </Formik>
  );
};

export default Login;
