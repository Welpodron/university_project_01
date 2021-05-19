import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/auth/Login";
import EmployeesPage from "./routes/EmployeesPage";
import OrdersPage from "./routes/OrdersPage";
import StatisticsPage from "./routes/StatisticsPage";
import VacationsPage from "./routes/VacationsPage";
import CreateVacation from "./routes/CreateVacation";
import CreateEmployee from "./components/employees/CreateEmployee";
import MoveEmployeePage from "./routes/MoveEmployeePage";
import renderError from "./components/errors/renderError";
import userContext from "./context/user";
import { check } from "./requests/auth";
import EmployeePage from "./routes/EmployeePage";
import DeleteEmployee from "./routes/DeleteEmployee";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    check()
      .then((d) => {
        d
          ? setUser({ role: d.role, employeeId: d.employeeId })
          : setUser({ role: "GUEST", employeeId: -1 });
      })
      .catch((err) => renderError(err));
  }, []);

  return (
    <>
      {user && (
        <userContext.Provider value={[user, setUser]}>
          <Router>
            <button
              className="btn btn-primary menu-opener"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
            <div
              className="offcanvas offcanvas-start"
              data-bs-scroll="true"
              tabIndex="-1"
              id="offcanvasWithBothOptions"
              aria-labelledby="offcanvasWithBothOptionsLabel"
            >
              <div className="offcanvas-header">
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <div className="mb-3">
                  <h2>Общая информация</h2>
                  <ul className="menu-list">
                    <li className="nav-item">
                      <Link className="btn btn-primary" to="/employees">
                        Сотрудники
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="btn btn-primary" to="/vacations">
                        Таблица отпусков
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="btn btn-primary" to="/statistics">
                        Статистика
                      </Link>
                    </li>
                  </ul>
                </div>
                {(user.role === "STAFF_SPECIALIST" ||
                  user.role === "STAFF_EDITOR") && (
                  <div className="mb-3">
                    <h2>Управление персоналом</h2>
                    <ul className="menu-list">
                      <li className="nav-item">
                        <Link className="btn btn-primary" to="/createEmployee">
                          Добавить сотрудника
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="btn btn-primary" to="/deleteEmployee">
                          Уволить сотрудников
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="btn btn-primary" to="/moveEmployee">
                          Переместить сотрудников
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
                {user.role.includes("STAFF_") && (
                  <div className="mb-3">
                    <h2>Приказы организации</h2>
                    <ul className="menu-list">
                      <li className="nav-item">
                        <Link className="btn btn-primary" to="/orders">
                          Приказы
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
                {(user.role === "STAFF_SPECIALIST" ||
                  user.role === "STAFF_VACATIONS_PLANNER") && (
                  <div className="mb-3">
                    <h2>Управление отпусками</h2>
                    <ul className="menu-list">
                      <li className="nav-item">
                        <Link className="btn btn-primary" to="/createVacation">
                          Создать отпуск
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
                {user.role !== "GUEST" && (
                  <div className="mb-3">
                    <ul className="menu-list">
                      <li className="nav-item">
                        <Link className="btn btn-primary" to="/login">
                          Сменить пользователя
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
                {user.role === "GUEST" && (
                  <div className="mb-3">
                    <ul className="menu-list">
                      <li className="nav-item">
                        <Link className="btn btn-primary" to="/login">
                          Войти в систему
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <Switch>
              <Route exact path="/employees">
                <EmployeesPage />
              </Route>
              <Route path="/orders">
                <OrdersPage />
              </Route>
              <Route path="/statistics">
                <StatisticsPage />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/createEmployee">
                <CreateEmployee />
              </Route>
              <Route path="/deleteEmployee">
                <DeleteEmployee />
              </Route>
              <Route path="/createVacation">
                <CreateVacation />
              </Route>
              <Route path="/vacations">
                <VacationsPage />
              </Route>
              <Route path="/moveEmployee">
                <MoveEmployeePage />
              </Route>
              <Route path="/employees/:Id">
                <EmployeePage />
              </Route>
            </Switch>
          </Router>
        </userContext.Provider>
      )}
    </>
  );
}

export default App;
