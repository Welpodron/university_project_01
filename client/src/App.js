import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/auth/Login";
import EmployeesPage from "./routes/EmployeesPage";
import OrdersPage from "./routes/OrdersPage";
import StatisticsPage from "./routes/StatisticsPage";
import VacationsPage from "./routes/VacationsPage";
import CreateVacation from "./routes/CreateVacation";

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
        d ? setUser({ role: d.role }) : setUser({ role: "GUEST" });
      })
      .catch((err) => renderError(err));
  }, []);

  /*

  <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
    <div className="offcanvas-header">
      <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdroped with scrolling</h5>
      <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div className="offcanvas-body">
      <p>Try scrolling the rest of the page to see this option in action.</p>
    </div>
  </div>

  */

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
                class="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
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
                <ul className="menu-list">
                  <li className="nav-item">
                    <Link className="btn btn-primary" to="/employees">
                      Сотрудники
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-primary" to="/orders">
                      Приказы
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-primary" to="/statistics">
                      Статистика
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-primary" to="/login">
                      Логин
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-primary" to="/vacations">
                      Таблица отпусков
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-primary" to="/createVacation">
                      Создать отпуск
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-primary" to="/test">
                      Увольнение сотрудников
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-primary" to="/moveEmployee">
                      Переместить сотрудников
                    </Link>
                  </li>
                </ul>
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
              <Route path="/test">
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
