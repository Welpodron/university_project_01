import React from "react";

const ErrorHandler = (props) => {
  console.error(props.children);

  return <p className="error">{props.children}</p>;
};

export default ErrorHandler;
