import React from "react";

const ErrorHandler = (props) => {
  console.error(props.children);

  return (
    <div className="toast fade show">
      <p className="toast-body">{props.children}</p>
    </div>
  );
};

export default ErrorHandler;
