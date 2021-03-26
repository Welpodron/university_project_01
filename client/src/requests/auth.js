import renderError from "../components/errors/renderError";

const OPTIONS_LOGIN = {
  method: "POST",
  credentials: "include",
};

const OPTIONS_CHECK = {
  credentials: "include",
};

const login = (data) =>
  fetch(`http://localhost:8080/auth/login`, {
    ...OPTIONS_LOGIN,
    body: data,
  })
    .then((res) => (!res.ok ? renderError(res) : res.json()))
    .then((json) => json)
    .catch((err) => renderError(err))
    .catch((err) => renderError(err));

const check = () =>
  fetch(`http://localhost:8080/auth/check`, { ...OPTIONS_CHECK })
    .then((res) => (!res.ok ? renderError(res) : res.json()))
    .then((json) => json)
    .catch((err) => renderError(err))
    .catch((err) => renderError(err));

export { login, check };
