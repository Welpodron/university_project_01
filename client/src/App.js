import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/auth/Login";
import EmployeesPage from "./routes/EmployeesPage";
import OrdersPage from "./routes/OrdersPage";

import renderError from "./components/errors/renderError";

import userContext from "./context/user";

import { check } from "./requests/auth";

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
            <Link to="/login">Логин</Link>
            <Switch>
              <Route path="/employees">
                <EmployeesPage />
              </Route>
              <Route path="/orders">
                <OrdersPage />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </Switch>
          </Router>
        </userContext.Provider>
      )}
    </>
  );
}

export default App;
