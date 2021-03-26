import React from "react";

import QueryOption from "./QueryOption";

const QueryOptions = ({ data }) => {
  return (
    <ul>
      {data.options.map((el) => (
        <QueryOption data={data.handlers} />
      ))}
    </ul>
  );
};

export default QueryOptions;
