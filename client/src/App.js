import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/auth/Login";
import EmployeesPage from "./routes/EmployeesPage";
import OrdersPage from "./routes/OrdersPage";
import StatisticsPage from "./routes/StatisticsPage";

import renderError from "./components/errors/renderError";

import userContext from "./context/user";

import { check } from "./requests/auth";
import EmployeePage from "./routes/EmployeePage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    check()
      .then((d) => {
        d ? setUser({ role: d.role }) : setUser({ role: "GUEST" });
      })
      .catch((err) => renderError(err));
  }, []);

  return (
    <>
      {user && (
        <userContext.Provider value={[user, setUser]}>
          <Router>
            <Link to="/employees">Сотрудники</Link>
            <Link to="/orders">Приказы</Link>
            <Link to="/statistics">Статистика</Link>
            <Link to="/login">Логин</Link>
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
