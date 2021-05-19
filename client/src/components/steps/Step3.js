import React from "react";

import InputGroup from "./Groups/InputGroup";
import TextareaGroup from "./Groups/TextareaGroup";

const Step3 = (props) => {
  const { errors, handleBlur, handleChange, touched, values } =
    props.data.formik;

  const { setStep } = props.data;

  return (
    <section className="mb-4">
      <header className="mb-4">
        <h2 className="mb-4">Шаг 3 из 5. Заполнение контактных данных</h2>
        <p className="m-0">Заполните контактные данные сотрудника</p>
      </header>
      <div className="mb-4">
        <InputGroup
          data={{
            desc: "Номер телефона использует следующий формат: 7XXXXXXXXXX Например: 74957771212",
            errors: errors.contactPhone,
            handleBlur,
            handleChange,
            customBlur: true,
            name: "contactPhone",
            placeholder: "Введите номер телефона сотрудника",
            touched: touched.contactPhone,
            type: "tel",
            value: values.contactPhone,
          }}
        >
          Номер телефона
        </InputGroup>
        <InputGroup
          data={{
            errors: errors.contactEmail,
            handleBlur,
            handleChange,
            name: "contactEmail",
            placeholder: "Введите электронную почту сотрудника",
            touched: touched.contactEmail,
            type: "email",
            value: values.contactEmail,
            required: true,
          }}
        >
          Электронная почта
        </InputGroup>
        <TextareaGroup
          data={{
            desc: "Адрес проживания заполняется согласно паспортным данным",
            errors: errors.contactAddress,
            handleBlur,
            handleChange,
            name: "contactAddress",
            placeholder: "Введите адрес проживания сотрудника",
            required: true,
            touched: touched.contactAddress,
            value: values.contactAddress,
          }}
        >
          Адрес проживания
        </TextareaGroup>
        <p className="my-4">
          <span className="text-danger">*</span> - обязательные к заполнению
          поля
        </p>
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
            errors.contactPhone ||
            errors.contactEmail ||
            errors.contactAddress
          }
        >
          Следующий шаг
        </button>
      </footer>
    </section>
  );
};

export default Step3;
