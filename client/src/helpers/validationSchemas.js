import * as Yup from "yup";
import moment from "moment";

const createEmployeeSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[а-яА-ЯёЁ]+$/, {
      message: "Имя может состоять только из букв русского алфавита",
    })
    .required("Обязательное поле"),
  lastName: Yup.string()
    .matches(/^[а-яА-ЯёЁ]+$/, {
      message: "Фамилия может состоять только из букв русского алфавита",
    })
    .required("Обязательное поле"),
  middleName: Yup.string().matches(/^[а-яА-ЯёЁ]+$/, {
    message: "Отчество может состоять только из букв русского алфавита",
  }),
  gender: Yup.string()
    .oneOf(
      ["М", "Ж"],
      "Пол может принимать только следующие значения: Мужской или Женский"
    )
    .required("Обязательное поле"),
  birthday: Yup.date()
    .min(
      moment().subtract(100, "years").format(),
      "Сотрудник не может быть старше 100 лет"
    )
    .max(
      moment().subtract(18, "years").format(),
      "Сотрудник не может быть младше 18 лет"
    )
    .required("Обязательное поле"),
  passportSerial: Yup.number()
    .typeError("Серия паспорта должна быть числом")
    .integer("Серия паспорта должна быть целым числом")
    .positive("Серия паспорта не может быть отрицательной")
    .min(
      1000,
      "Серия паспорта не может быть меньше 4 цифр, начинаться с 0, а также быть отрицательным числом"
    )
    .max(
      9999,
      "Серия паспорта не может быть больше 4 цифр, начинаться с 0, а также быть отрицательным числом"
    )
    .required("Обязательное поле"),
  passportNumber: Yup.number()
    .typeError("Номер паспорта должен быть числом")
    .integer("Номер паспорта должен быть целым числом")
    .positive("Номер паспорта не может быть отрицательным")
    .min(
      100000,
      "Номер паспорта не может быть меньше 6 цифр, начинаться с 0, а также быть отрицательным числом"
    )
    .max(
      999999,
      "Номер паспорта не может быть больше 6 цифр, начинаться с 0, а также быть отрицательным числом"
    )
    .required("Обязательное поле"),
  passportDate: Yup.date()
    .min(
      moment("1990-01-01T00:00:00"),
      "Минимально допустимая дата получения паспорта: 1 января 1990 года"
    )
    .max(
      moment().format(),
      "Дата получения паспорта не может быть больше текущей даты"
    )
    .required("Обязательное поле")
    .test(
      "is-still-valid",
      "Внимание! Паспорт с истекшим сроком действия - недействителен, пожалуйста, обратитесь в ближайший доступный паспортный центр для получения нового паспорта",
      (value, testContext) => {
        if (value && testContext.parent["birthday"]) {
          const age = moment(moment().format("YYYY-MM-DD")).diff(
            testContext.parent["birthday"],
            "years"
          );
          if (age < 45 && age > 19) {
            //Прибавить к дате рождения 20 лет
            //Дата когда должен был быть получен новый паспорт
            // проверить дата выдачи паспорта меньше новой даты выдачи или нет
            return !moment(value).isBefore(
              moment(testContext.parent["birthday"]).add(20, "years")
            );
          } else if (age > 44) {
            //Прибавить к дате рождения 45 лет
            return !moment(value).isBefore(
              moment(testContext.parent["birthday"]).add(45, "years")
            );
          }
        }
        return true;
      }
    ),
  passportFrom: Yup.string().required("Обязательное поле"),
  contactPhone: Yup.string()
    .matches(
      /^7[0-9\-\+]{10}$/,
      "Формат введенного телефона не соответствует требуемому"
    )
    .required("Обязательное поле"),
  // Блок с кодом временно отключен до подтверждения валерии александровны
  // .test("is-unique", "Телефон занят другим сотрудником", async (value) => {
  //   if (value && value.match(/^7[0-9\-\+]{10}$/)) {
  //     const res = await fetch(
  //       `http://localhost:8080/api/phones?phone=${value}`
  //     );
  //     const json = await res.json();
  //     return !(json.length > 0);
  //   }
  // }),
  contactEmail: Yup.string().email(
    "Введенный почтовый адрес на валиден, возможно вы забыли указать @, а также домен почтового ящика"
  ),
  contactAddress: Yup.string().required("Обязательное поле"),
  jobId: Yup.number()
    .typeError("Обязательное поле")
    .required("Обязательное поле"),
  depId: Yup.number()
    .typeError("Обязательное поле")
    .required("Обязательное поле"),
});

export { createEmployeeSchema };
