import renderError from "../components/errors/renderError";

const OPTIONS_CHECK = {
  credentials: "include",
};

const getEmployees = (amount = 20, page = 0) =>
  fetch(`http://localhost:8080/employees?amount=${amount}&page=${page}`)
    .then((res) => (!res.ok ? renderError(res) : res.json()))
    .then((json) => json)
    .catch((err) => renderError(err))
    .catch((err) => renderError(err));

const getOrders = (amount = 20, page = 0) =>
  fetch(`http://localhost:8080/orders?amount=${amount}&page=${page}`, {
    ...OPTIONS_CHECK,
  })
    .then((res) => (!res.ok ? renderError(res) : res.json()))
    .then((json) => json)
    .catch((err) => renderError(err))
    .catch((err) => renderError(err));

const getStatistics = () =>
  fetch(`http://localhost:8080/statistics`)
    .then((res) => (!res.ok ? renderError(res) : res.json()))
    .then((json) => json)
    .catch((err) => renderError(err))
    .catch((err) => renderError(err));

const getEmployee = (id) =>
  fetch(`http://localhost:8080/employees?id=${id}`)
    .then((res) => (!res.ok ? renderError(res) : res.json()))
    .then((json) => json)
    .catch((err) => renderError(err))
    .catch((err) => renderError(err));

const tryToFind = (q, exact = 0) =>
  fetch(`http://localhost:8080/api/search?q=${q}&exact=${exact}`)
    .then((res) => (!res.ok ? renderError(res) : res.json()))
    .then((json) => json)
    .catch((err) => renderError(err))
    .catch((err) => renderError(err));

export { getEmployees, getOrders, getStatistics, getEmployee, tryToFind };
