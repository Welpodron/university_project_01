import React from "react";

const Step6 = (props) => {
  const { resetForm } = props.data.formik;

  const { setStep } = props.data;

  return (
    <section className="mb-4">
      <header className="mb-4">
        <h2 className="mb-4">Сотрудник успешно добавлен!</h2>
        <p className="m-0">
          Если вы хотите добавить нового сотрудника нажмите на кнопку "Добавить
          нового сотрудника"
        </p>
      </header>
      <footer className="d-flex justify-content-between align-items-center">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            setStep(0);
            resetForm();
          }}
        >
          Добавить нового сотрудника
        </button>
      </footer>
    </section>
  );
};

export default Step6;
