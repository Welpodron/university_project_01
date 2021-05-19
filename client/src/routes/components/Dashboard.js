import React, { useEffect, useState } from "react";

import DonutChart from "./DonutChart";

import counter from "../../helpers/counter";

import "./styles/Dashboard.css";

const Dashboard = ({ data }) => {
  const [options, setOptions] = useState(null);
  const [optionsActive, setOptionsActive] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setOptions(data.map((el) => el.Index));
    setOptionsActive(data.map((el) => el.Index));
    setTotalAmount(data.reduce((acc, cur) => acc + cur.Amount, 0));
  }, []);

  const filter = (data) =>
    data.filter((el) => optionsActive.includes(el.Index));

  return (
    <div className="statistics-page p-5 bg-light">
      {data && optionsActive && (
        <>
          <ul className="statistics-list">
            <li className="p-5 shadow-sm rounded bg-white statistics-card">
              <p>Наиболее популярная должность</p>
              <h2>
                {
                  data.find(
                    (el) => el.Amount === counter("max", data, "Amount")
                  ).Name
                }
              </h2>
              <p>Составляет</p>
              <h2>
                {`${Math.floor(
                  (data.find(
                    (el) => el.Amount === counter("max", data, "Amount")
                  ).Amount /
                    totalAmount) *
                    100
                )}% от всех сотрудников`}
              </h2>
            </li>
            <li className="p-5 shadow-sm rounded bg-white statistics-card">
              <p>Наименее популярная должность</p>
              <h2>
                {
                  data.find(
                    (el) => el.Amount === counter("min", data, "Amount")
                  ).Name
                }
              </h2>
              <p>Составляет</p>
              <h2>
                {`${Math.floor(
                  (data.find(
                    (el) => el.Amount === counter("min", data, "Amount")
                  ).Amount /
                    totalAmount) *
                    100
                )}% от всех сотрудников`}
              </h2>
            </li>
            <li className="p-5 shadow-sm rounded bg-white statistics-card">
              <p>Наиболее высокооплачиваемая должность</p>
              <h2>
                {
                  data.find(
                    (el) => el.Payment === counter("max", data, "Payment")
                  ).Name
                }
              </h2>
              <p>имеет ЗП</p>
              <h2>
                {`${
                  data.find(
                    (el) => el.Payment === counter("max", data, "Payment")
                  ).Payment
                } рублей`}
              </h2>
            </li>
            <li className="p-5 shadow-sm rounded bg-white statistics-card">
              <p>Наименее оплачиваемая должность:</p>
              <h2>
                {
                  data.find(
                    (el) => el.Payment === counter("min", data, "Payment")
                  ).Name
                }
              </h2>
              <p>имеет ЗП</p>
              <h2>
                {`${
                  data.find(
                    (el) => el.Payment === counter("min", data, "Payment")
                  ).Payment
                } рублей`}
              </h2>
            </li>
          </ul>
          <div className="p-5 shadow-sm rounded bg-white statistics-card">
            <DonutChart width={600} height={400} data={filter(data)} />
            <ul className="sort-list">
              {options &&
                options.map((opt) => {
                  return (
                    <li>
                      <div className="form-check">
                        <label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={optionsActive.includes(opt)}
                            onChange={() => {
                              const checked = optionsActive.includes(opt);
                              setOptionsActive((prev) => {
                                return checked
                                  ? optionsActive.filter(
                                      (option) => option !== opt
                                    )
                                  : [...prev, opt];
                              });
                            }}
                          />
                          {`${data[opt].Name} ${
                            data[opt].Amount
                          } человек(а) (${Math.floor(
                            (data[opt].Amount / totalAmount) * 100
                          )}%)`}
                        </label>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
