import React from "react";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";

import "./Steps.css";

const Steps = (props) => {
  const { step, setStep, formik } = props.data;

  switch (step) {
    case 0:
      return <Step1 data={{ setStep, formik }} />;
    case 1:
      return <Step2 data={{ setStep, formik }} />;
    case 2:
      return <Step3 data={{ setStep, formik }} />;
    case 3:
      return <Step4 data={{ setStep, formik }} />;
    case 4:
      return <Step5 data={{ setStep, formik }} />;
    case 5:
      return <Step6 data={{ setStep, formik }} />;
    default:
      return null;
  }
};

export default Steps;
