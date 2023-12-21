<script>
  import * as d3 from "d3";
  import {
    currentScenario,
    yourData,
    selectedPersonData,
    yourBirthYear,
    selecterPersonBirthYear,
    started,
  } from "../store/store";
  import { data } from "../assets/data/temperatureData";

  const margin = {
    top: 100,
    right: 0,
    bottom: 78,
    left: 0,
  };
  let width = 200;
  const height = 8000 - margin.top - margin.bottom;
  $: center = width / 2;

  const yScale = d3
    .scaleLinear()
    .domain([1, 100])
    .range([margin.top, height - margin.bottom]);

  const tempColorScale = d3
    .scaleThreshold()
    .domain([0, 0.4, 0.8, 1.2, 1.6, 2, 2.4, 2.8, 3.2, 3.6, 4, 4.4, 4.8])
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

  const numbers = Array.from({ length: 100 }, (_, index) => index + 1);
  const imgDimension = 40;
  const ageRectWidth = 80;
  const tempTextOffsetX = 80;
  const yearTextOffsetX = 10;
  const yearTextOffsetY = 35;

  const yOffsetScale = d3
    .scaleLinear()
    .domain([0, height])
    .range([0, screen.height]);

  const handleScroll = () => {
    if (!svg) return;
    const { top = 0 } = svg.getBoundingClientRect() || {};
    imageOffset = Math.max(0, -top);
  };

  let svg;
  let imageOffset = 0;

  $: currentYIndex = Math.floor(yScale.invert(imageOffset)); //+ yOffsetScale(imageOffset)
</script>

<svelte:window on:scroll={handleScroll} />

<div id="chart" bind:clientWidth={width}>
  {#if $yourData && $selectedPersonData && $yourBirthYear && $selecterPersonBirthYear && $currentScenario && $started}
    <svg
      {width}
      height={height + margin.top}
      transform={"translate(0," + margin.top + ")"}
      bind:this={svg}
    >
      <g id="background" transform={`translate(0,${margin.top})`}>
        {#each $yourData as d, i (d.Year)}
          <rect
            class="bgRect1"
            id={`bgRect1_${i + 1}`}
            width={width / 2 - margin.left}
            height={yScale(1) - yScale(0)}
            x={0}
            y={yScale(d.Year - $yourBirthYear) + (yScale(1) - yScale(0))}
            stroke="black"
            stroke-width={d.Year - $yourBirthYear === currentYIndex ? 2 : 0}
            fill={d.historic === "NA"
              ? "#bdbdbd"
              : tempColorScale(d[$currentScenario])}
          >
          </rect>
          <text
            x={0}
            y={yScale(d.Year - $yourBirthYear) + (yScale(1) - yScale(0)) + 40}
            >{d[$currentScenario].toFixed(2)}, {i}</text
          >
        {/each}
      </g>
      <g id="background2" transform={`translate(${width / 2},${margin.top})`}>
        {#each $selectedPersonData as d, i (d.Year)}
          <rect
            class="bgRect2"
            id={`bgRect2_${i + 1}`}
            width={width / 2 - margin.left}
            height={yScale(1) - yScale(0)}
            x={0}
            y={yScale(d.Year - $selecterPersonBirthYear) +
              (yScale(1) - yScale(0))}
            stroke="black"
            stroke-width={d.Year - $selecterPersonBirthYear === currentYIndex
              ? 2
              : 0}
            fill={d.historic === "NA"
              ? "#bdbdbd"
              : tempColorScale(d[$currentScenario])}
          >
          </rect>
          <text
            x={0}
            y={yScale(d.Year - $selecterPersonBirthYear) +
              (yScale(1) - yScale(0))}>{d[$currentScenario]}</text
          >
        {/each}</g
      >
      <image
        class="you"
        width={imgDimension * 2}
        height={imgDimension * 2}
        x={center - imgDimension * 2}
        y={yScale(currentYIndex + 3) - 60}
        xlink:href={"baby.png"}
      />
      <image
        class="celebrity"
        width={imgDimension * 2}
        height={imgDimension * 2}
        x={center}
        y={yScale(currentYIndex + 3) - 60}
        xlink:href={"baby.png"}
      />
    </svg>
  {/if}
</div>

<style>
  #chart {
    width: 100%;
    margin-bottom: 100px;
  }
</style>
