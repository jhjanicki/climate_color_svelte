import * as d3 from "d3";

export const formatScenarioText = (scenario) => {
	const ssp = scenario.slice(0, 3).toUpperCase();
    const num = scenario.slice(3, 4);
    const ERF1 = scenario.slice(4, 5);
    const ERF2 = scenario.slice(5);
    return `${ssp}${num}-${ERF1}.${ERF2}`;
};

export const tempDomain = [
    0, 0.4, 0.8, 1.2, 1.6, 2, 2.4, 2.8, 3.2, 3.6, 4, 4.4, 4.8,
  ];

export const tempColorScale = d3
.scaleThreshold()
.domain(tempDomain)
.range([
  "#4292c6",
  "#39b5b5",
  "#6bc8b1",
  "#eaeccc",
  "#fedd93",
  "#fec700",
  "#ff9e00",
  "#ff7f1f",
  "#e85338",
  "#c7245a",
  "#b00a8c",
  "#790096",
  "#4f0097",
]);

export const scenarioMap = d3
.scaleOrdinal()
.domain(["ssp119", "ssp126", "ssp245", "ssp370", "ssp585"])
.range([
  "Very low emissions",
  "Low emissions",
  "Intermediate emissions",
  "High emissions",
  "Very high emissions",
]);
