import React from "react";

const QueryOption = ({ data }) => {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={data.checked}
          onChange={data.handleChange}
        />
        {data.name}
      </label>
    </li>
  );
};

export default QueryOption;
