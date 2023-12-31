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
  "#213468",
  "#2171b5",
  "#6baed6",
  "#deebf7",
  "#fff5f0",
  "#fee0d2",
  "#fcbba1",
  "#fc9272",
  "#fb6a4a",
  "#ef3b2c",
  "#cb181d",
  "#a50f15",
  "#67000d",
]);

