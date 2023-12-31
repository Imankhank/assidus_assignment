import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const BarGraph2 = ({ selectedMonth }) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 0, right: 10, bottom: 120, left: 10 };
    const width = 650 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const data = [
      { month: "older", cashIn: 150 },
      { month: `${selectedMonth?.label.slice(0, 3)} 01-08`, cashIn: 150 },
      { month: `${selectedMonth?.label.slice(0, 3)} 09-16`, cashIn: 180 },
      { month: `${selectedMonth?.label.slice(0, 3)} 17-24`, cashIn: 200 },
      {
        month: `${selectedMonth?.label.slice(0, 3)} 25-${
          selectedMonth?.label.slice(0, 3) === "Feb" ? "28" : "30"
        }`,
        cashIn: 250,
      },
      { month: "future", cashIn: 200 },
    ];
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .range([0, width])
      .padding(0.8);

    const yScale = d3.scaleLinear().domain([0, 400]).range([height, 0]);
    const barWidth = xScale.bandwidth() * 0.7;

    const xAxis = d3.axisBottom(xScale).tickSize(0);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("fill", "hsla(0, 0%, 44%, 0.65)")
      .style("font-size", "15px")
      .style("font-weight", "500")
      .attr("rx", 5)
      .attr("dy", "2em");

    const bars = svg
      .selectAll(".bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.month) + (xScale.bandwidth() - barWidth) / 2)
      .attr("y", (d) => yScale(d.cashIn))
      .attr("height", (d) => height - yScale(d.cashIn))
      .attr("width", xScale.bandwidth())
      .attr("ry", 4)
      .style("fill", "#4fb14f");
  }, [selectedMonth]);

  return (
    <div className="no-scrollbars px-2">
      <svg
        className="d-flex gap-5"
        ref={svgRef}
        style={{ display: "block" }}
      ></svg>
    </div>
  );
};

export default BarGraph2;
