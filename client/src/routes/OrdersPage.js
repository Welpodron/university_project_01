import React, { useContext, useEffect, useState } from "react";

import { Redirect } from "react-router-dom";

import renderError from "../components/errors/renderError";

import { getOrders } from "../requests/requests";

import Order from "./components/Order";

import userContext from "../context/user";

import { check } from "../requests/auth";

const OrdersPage = () => {
  const [user, setUser] = useContext(userContext);

  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (!user.role.includes("STAFF_")) {
      return;
    }
    getOrders(20)
      .then((d) => setOrders(d))
      .catch((err) => renderError(err));
  }, []);

  return (
    <ul className="employees-list p-5">
      {orders && orders.map((el) => <Order key={el.Id} data={el} />)}
    </ul>
  );
};

export default OrdersPage;
