import React from "react";

const SelectGroup = (props) => {
  const {
    desc,
    errors,
    handleBlur,
    handleChange,
    name,
    placeholder,
    required,
    touched,
    value,
    options,
    disabled,
    readOnly,
  } = props.data;

  // [{value: "", placeholder: ""}, {}] - options

  return (
    <div className="mb-2">
      <label
        className={`form-label${touched && errors ? " text-danger" : ""}`}
        htmlFor={name}
      >
        {props.children} {required && <span className="text-danger">*</span>}
      </label>
      <select
        aria-label={placeholder}
        className={`form-select${touched && errors ? " is-invalid" : ""}`}
        id={name}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
      >
        <option value="DEFAULT" disabled={true}>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.placeholder}
          </option>
        ))}
      </select>
      {touched && errors && <p className="invalid-feedback">{errors}</p>}
      {desc && <p className="form-text mb-0 mt-2">{desc}</p>}
    </div>
  );
};

export default SelectGroup;
