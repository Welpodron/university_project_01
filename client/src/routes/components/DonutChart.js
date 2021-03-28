import * as d3 from "d3";

import React, { useRef, useEffect } from "react";

const DonutChart = ({ width, height, data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height]);
  }, []);

  useEffect(() => {
    draw(data);
  }, [data]);

  const pieFunc = d3
    .pie()
    .sort(null)
    .value((d) => d.Amount);

  const arcFunc = () => {
    const radius = Math.min(width, height) / 2;
    return d3
      .arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius - 1);
  };

  const colorFunc = d3.scaleOrdinal(d3.schemeCategory10);

  const draw = (data) => {
    const svg = d3.select(ref.current);

    const path = svg.selectAll("path").data(pieFunc(data));

    const pathEnter = path
      .join("path")
      .attr("fill", (d) => colorFunc(d.data.Amount))
      .attr("d", arcFunc())
      .text((d) => `${d.data.Name} ${d.value}`);
  };

  return (
    <div className="chart">
      <svg ref={ref}></svg>
    </div>
  );
};

export default DonutChart;
