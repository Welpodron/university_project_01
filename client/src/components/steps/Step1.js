import React from "react";
import moment from "moment";

import InputGroup from "./Groups/InputGroup";
import SelectGroup from "./Groups/SelectGroup";

const Step1 = (props) => {
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
        <h2 className="mb-4">Шаг 1 из 5. Заполнение базовых данных</h2>
        <p className="m-0">
          Заполните фамилию, имя и отчество будущего сотрудника, а также укажите
          его пол и введите дату рождения
        </p>
      </header>
      <div>
        <InputGroup
          data={{
            errors: errors.lastName,
            handleBlur,
            handleChange,
            name: "lastName",
            placeholder: "Введите фамилию сотрудника",
            required: true,
            touched: touched.lastName,
            type: "text",
            value: values.lastName,
          }}
        >
          Фамилия
        </InputGroup>
        <InputGroup
          data={{
            errors: errors.firstName,
            handleBlur,
            handleChange,
            name: "firstName",
            placeholder: "Введите имя сотрудника",
            required: true,
            touched: touched.firstName,
            type: "text",
            value: values.firstName,
          }}
        >
          Имя
        </InputGroup>
        <InputGroup
          data={{
            desc:
              "Необязательное поле для сотрудников, не имеющих отчество, однако для сотрудников, которые имеют отчество поле заполняется обязательно",
            errors: errors.middleName,
            handleBlur,
            handleChange,
            name: "middleName",
            placeholder: "Введите отчество сотрудника",
            required: false,
            touched: touched.middleName,
            type: "text",
            value: values.middleName,
          }}
        >
          Отчество
        </InputGroup>
        <SelectGroup
          data={{
            errors: errors.gender,
            handleBlur,
            handleChange,
            name: "gender",
            placeholder: "Выберете пол сотрудника",
            required: true,
            touched: touched.gender,
            value: values.gender,
            options: [
              { value: "М", placeholder: "Мужской" },
              { value: "Ж", placeholder: "Женский" },
            ],
          }}
        >
          Пол
        </SelectGroup>
        <InputGroup
          data={{
            errors: errors.birthday,
            handleBlur,
            handleChange,
            name: "birthday",
            placeholder: "Введите/Выберете дату рождения сотрудника",
            required: true,
            touched: touched.birthday,
            type: "date",
            max: moment().subtract(18, "years").format("YYYY-MM-DD"),
            min: moment().subtract(100, "years").format("YYYY-MM-DD"),
            value: values.birthday,
          }}
        >
          Дата рождения
        </InputGroup>
        <p className="my-4">
          <span className="text-danger">*</span> - обязательные к заполнению
          поля
        </p>
      </div>
      <footer>
        <button
          className="btn btn-primary"
          disabled={
            !Object.keys(touched).length > 0 ||
            errors.firstName ||
            errors.lastName ||
            errors.middleName ||
            errors.gender ||
            errors.birthday
          }
          type="button"
          onClick={() => setStep((prevStep) => prevStep + 1)}
        >
          Следующий шаг
        </button>
      </footer>
    </section>
  );
};

export default Step1;
