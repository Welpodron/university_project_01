import React from "react";

const Order = (props) => {
  const {
    Id,
    Category,
    Date,
    FirstName,
    LastName,
    MiddleName,
    Status,
  } = props.data;

  return (
    <li>
      <p>{Id}</p>
      <p>{Category}</p>
      <p>{Date}</p>
      <p>{`${LastName} ${FirstName} ${MiddleName || ""}`}</p>
      <p>{Status}</p>
    </li>
  );
};

export default Order;
