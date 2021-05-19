import React from "react";
import moment from "moment";

import { unmountComponentAtNode } from "react-dom";

const ErrorHandler = (props) => {
  console.error(props.children);

  return (
    <div
      id="liveToast"
      className="toast fade show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <strong class="me-auto">Уведомление</strong>
        <small>{moment().format("h:mm:ss a")}</small>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Закрыть"
          onClick={() =>
            unmountComponentAtNode(document.getElementById("error"))
          }
        ></button>
      </div>
      <p className="toast-body">{props.children}</p>
    </div>
  );
};

export default ErrorHandler;
