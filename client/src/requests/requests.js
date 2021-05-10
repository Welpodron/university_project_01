import renderError from "../components/errors/renderError";

const OPTIONS_SENSITIVE = {
  method: "POST",
  credentials: "include",
};

const OPTIONS_DELETE = {
  method: "DELETE",
  credentials: "include",
};

const OPTIONS_MOVE = {
  method: "PATCH",
  credentials: "include",
};

const OPTIONS_CHECK = {
  credentials: "include",
};

const getDepartments = () =>
  fetch(`http://localhost:8080/api/departments`)
    .then((res) => (!res.ok ? renderError(res) : res.json()))
    .then((json) => json)
    .catch((err) => renderError(err))
    .catch((err) => renderError(err));

const getVacationsTypes = () =>
  fetch(`http://localhost:8080/api/vacationsTypes`)
    .then((res) => (!res.ok ? renderError(res) : res.json()))
    .then((json) => json)
    .catch((err) => renderError(err))
    .catch((err) => renderError(err));

const getJobs = () =>
  fetch(`http://localhost:8080/api/jobs`)
    .then((res) => (!res.ok ? renderError(res) : res.json()))
    .then((json) => json)
    .catch((err) => renderError(err))
    .catch((err) => renderError(err));

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

const getVacations = () =>
  fetch(`http://localhost:8080/vacations`)
    .then((res) => (!res.ok ? renderError(res) : res.json()))
    .then((json) => json)
    .catch((err) => renderError(err))
    .catch((err) => renderError(err));

const createVacations = (data) =>
  fetch(`http://localhost:8080/vacations`, {
    ...OPTIONS_SENSITIVE,
    body: data,
  })
    .then((res) => (!res.ok ? renderError(res) : res.json()))
    .then((json) => json)
    .catch((err) => renderError(err))
    .catch((err) => renderError(err));

const deleteEmployees = (data) =>
  fetch(`http://localhost:8080/employees`, {
    ...OPTIONS_DELETE,
    body: data,
  })
    .then((res) => (!res.ok ? renderError(res) : res.json()))
    .then((json) => json)
    .catch((err) => renderError(err))
    .catch((err) => renderError(err));

const moveEmployees = (data) =>
  fetch(`http://localhost:8080/employees`, {
    ...OPTIONS_MOVE,
    body: data,
  })
    .then((res) => (!res.ok ? renderError(res) : res.json()))
    .then((json) => json)
    .catch((err) => renderError(err))
    .catch((err) => renderError(err));

export {
  getEmployees,
  getOrders,
  getStatistics,
  getEmployee,
  getDepartments,
  getJobs,
  tryToFind,
  deleteEmployees,
  getVacations,
  createVacations,
  moveEmployees,
  getVacationsTypes,
};
