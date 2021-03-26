import React from "react";

const TextareaGroup = (props) => {
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
  } = props.data;

  return (
    <div className="mb-2">
      <label
        className={`form-label${touched && errors ? " text-danger" : ""}`}
        htmlFor={name}
      >
        {props.children} {required && <span className="text-danger">*</span>}
      </label>
      <textarea
        aria-label={placeholder}
        className={`form-control${touched && errors ? " is-invalid" : ""}`}
        id={name}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        value={value}
      />
      {touched && errors && <p className="invalid-feedback">{errors}</p>}
      {desc && <p className="form-text mb-0 mt-2">{desc}</p>}
    </div>
  );
};

export default TextareaGroup;
