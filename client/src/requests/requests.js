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

export { getEmployees, getOrders };
