import React from "react";

const Order = (props) => {
  const { Id, Category, FirstName, LastName, MiddleName, Status } = props.data;

  const convertDate = (date) => new Date(date);

  return (
    <li>
      <p>{`Номер приказа: ${Id}`}</p>
      <p>{`Категория приказа: ${Category}`}</p>
      <p>{`Дата формирования приказа: ${convertDate(props.data["Date"])}`}</p>
      <p>{`${LastName} ${FirstName} ${MiddleName || ""}`}</p>
      <p>{`Текущий статус: ${Status}`}</p>
      {Status === "Не подтвержден" && (
        <div>
          <button type="button">Подтвердить</button>
          <button type="button">Отклонить</button>
        </div>
      )}
    </li>
  );
};

export default Order;
