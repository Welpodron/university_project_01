import React, { useEffect, useState } from "react";

import renderError from "../components/errors/renderError";

import { getStatistics } from "../requests/requests";

import Dashboard from "./components/Dashboard";

const StatisticsPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getStatistics()
      .then((data) => setData(data.map((el, i) => ({ ...el, Index: i }))))
      .catch((err) => renderError(err));
  }, []);

  return <>{data && <Dashboard data={data} />}</>;
};

export default StatisticsPage;
