import ReactDom from "react-dom";
import ErrorHandler from "./Error";

const renderError = (err) => {
  try {
    err
      .json()
      .then((data) => {
        ReactDom.render(
          <ErrorHandler>{data.error}</ErrorHandler>,
          document.getElementById("error")
        );
      })
      .catch((_) => {
        ReactDom.render(
          <ErrorHandler>{`${err.status} ${err.statusText}`}</ErrorHandler>,
          document.getElementById("error")
        );
      });
  } catch (error) {
    ReactDom.render(
      <ErrorHandler>
        Внимание произошла ошибка при работе приложения!
      </ErrorHandler>,
      document.getElementById("error")
    );
  }
};

export default renderError;
