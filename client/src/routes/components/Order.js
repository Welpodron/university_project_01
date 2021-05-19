import React from "react";

import moment from "moment";

const Order = (props) => {
  const { Id, Category, FirstName, LastName, MiddleName } = props.data;

  return (
    <li className="shadow rounded p-3">
      <p>{`Номер приказа: ${Id}`}</p>
      <p>{`Категория приказа: ${Category}`}</p>
      <p>{`Дата формирования приказа: ${moment(props.data["Date"]).format(
        "DD-MM-YYYY"
      )}`}</p>
      <p>{`Приказ оформлен на: ${LastName} ${FirstName} ${
        MiddleName || ""
      }`}</p>
    </li>
  );
};

export default Order;
