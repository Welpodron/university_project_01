const counter = (method, arrObj, field) =>
  method === "avg"
    ? Math.ceil(
        arrObj.map((obj) => obj[field]).reduce((prev, cur) => prev + cur, 0) /
          arrObj.length
      )
    : Math[method].apply(
        null,
        arrObj.map((obj) => obj[field])
      );

export default counter;
