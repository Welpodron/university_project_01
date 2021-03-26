import React from "react";

const Step5 = (props) => {
  const { errors, touched } = props.data.formik;

  const { setStep } = props.data;

  return (
    <section className="mb-4">
      <header className="mb-4">
        <h2 className="mb-4">
          Шаг 5 из 5. Добавление нового сотрудника в базу данных
        </h2>
        <p className="m-0">
          Внимание! Перед отправкой запроса на сервер, ещё раз проверьте
          введенные данные, если вы уверены в их правильности, нажмите на кнопку
          "Добавить сотрудника"
        </p>
      </header>
      <footer className="d-flex justify-content-between align-items-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setStep((prevStep) => prevStep - 1)}
        >
          Предыдущий шаг
        </button>
        <button
          type="submit"
          className="btn btn-danger"
          disabled={
            !Object.keys(touched).length > 0 || Object.keys(errors).length !== 0
          }
        >
          Добавить сотрудника
        </button>
      </footer>
    </section>
  );
};

export default Step5;
