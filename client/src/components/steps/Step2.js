import React from "react";
import moment from "moment";

import InputGroup from "./Groups/InputGroup";
import TextareaGroup from "./Groups/TextareaGroup";

const Step2 = (props) => {
  const {
    errors,
    handleBlur,
    handleChange,
    touched,
    values,
  } = props.data.formik;

  const { setStep } = props.data;

  return (
    <section className="mb-4">
      <header className="mb-4">
        <h2 className="mb-4">Шаг 2 из 5. Заполнение паспортных данных</h2>
        <p className="m-0">
          Внимательно заполните паспортные данные сотрудника. Все поля формы
          заполняются строго в соответствии с паспортом
        </p>
      </header>
      <div className="mb-4">
        <InputGroup
          data={{
            desc:
              "Серия паспорта должна находиться в диапазоне от 1000 до 9999",
            errors: errors.passportSerial,
            handleBlur,
            handleChange,
            name: "passportSerial",
            placeholder: "Введите серию паспорта",
            min: 1000,
            max: 9999,
            required: true,
            touched: touched.passportSerial,
            type: "number",
            value: values.passportSerial,
          }}
        >
          Серия
        </InputGroup>
        <InputGroup
          data={{
            desc:
              "Номер паспорта должен находиться в диапазоне от 100000 до 999999",
            errors: errors.passportNumber,
            handleBlur,
            handleChange,
            name: "passportNumber",
            placeholder: "Введите номер паспорта",
            min: 100000,
            max: 999999,
            required: true,
            touched: touched.passportNumber,
            type: "number",
            value: values.passportNumber,
          }}
        >
          Номер
        </InputGroup>
        <InputGroup
          data={{
            errors: errors.passportDate,
            handleBlur,
            handleChange,
            name: "passportDate",
            placeholder: "Введите/Выберете дату выдачи паспорта",
            required: true,
            touched: touched.passportDate,
            type: "date",
            max: moment().format("YYYY-MM-DD"),
            min: "1990-01-01",
            value: values.passportDate,
          }}
        >
          Дата выдачи
        </InputGroup>
        <TextareaGroup
          data={{
            errors: errors.passportFrom,
            handleBlur,
            handleChange,
            name: "passportFrom",
            placeholder: "Введите информацию о представителе паспорта",
            required: true,
            touched: touched.passportFrom,
            value: values.passportFrom,
          }}
        >
          Паспорт выдан
        </TextareaGroup>
      </div>
      <footer className="d-flex justify-content-between align-items-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setStep((prevStep) => prevStep - 1)}
        >
          Предыдущий шаг
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setStep((prevStep) => prevStep + 1)}
          disabled={
            !Object.keys(touched).length > 0 ||
            errors.passportSerial ||
            errors.passportNumber ||
            errors.passportDate ||
            errors.passportFrom
          }
        >
          Следующий шаг
        </button>
      </footer>
    </section>
  );
};

export default Step2;
