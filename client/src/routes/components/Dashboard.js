import React, { useEffect, useState } from "react";

import DonutChart from "./DonutChart";

const Dashboard = ({ data }) => {
  const [options, setOptions] = useState(null);
  const [optionsActive, setOptionsActive] = useState(null);

  useEffect(() => {
    setOptions(data.map((el) => el.Index));
    setOptionsActive(data.map((el) => el.Index));
  }, []);

  const filter = (data) =>
    data.filter((el) => optionsActive.includes(el.Index));

  return (
    <div>
      {data && optionsActive && (
        <>
          <DonutChart width={600} height={400} data={filter(data)} />
          <ul>
            {options &&
              options.map((opt) => {
                return (
                  <li>
                    <label>
                      <input
                        type="checkbox"
                        checked={optionsActive.includes(opt)}
                        onChange={() => {
                          const checked = optionsActive.includes(opt);
                          setOptionsActive((prev) => {
                            return checked
                              ? optionsActive.filter((option) => option !== opt)
                              : [...prev, opt];
                          });
                        }}
                      />
                      {data[opt].Name}
                    </label>
                  </li>
                );
              })}
          </ul>
        </>
      )}
    </div>
  );
};

export default Dashboard;
