<script>
  import * as d3 from "d3";
  import textures from "textures";
  import { onMount } from "svelte";
  import {
    selectedPerson,
    currentScenario,
    yourData,
    selectedPersonData,
    yourBirthYear,
    selecterPersonBirthYear,
    yourBirthYearTemp,
    selecterPersonBirthYearTemp,
    started,
  } from "../store/store";
  import { tempDomain, tempColorScale, scenarioMap } from "../lib/utils";

  const margin = {
    top: 30,
    right: 0,
    bottom: 110,
    left: 0,
  };

  let width = 200;
  const height = 8000 - margin.top - margin.bottom;
  $: center = width / 2;

  const imgDimension = 40;
  const ageRectWidth = 80;
  const tempTextOffsetX = 145;
  const yearTextOffsetX = 10;
  const yearTextOffsetY = 45;

  const yScale = d3
    .scaleLinear()
    .domain([1, 100])
    .range([margin.top, height - margin.bottom]);

  const indices = Array.from({ length: 10 }, (_, i) => i);

  const mapTempToTexture = d3
    .scaleThreshold()
    .domain(tempDomain)
    .range(indices);

  const handleScroll = () => {
    if (!svg) return;
    const { top = 0 } = svg.getBoundingClientRect() || {};
    imageOffset = Math.max(0, -top);
  };

  let svg;
  let imageOffset = 0;
  $: currentYIndex = Math.floor(yScale.invert(imageOffset));

  const textureArray = tempDomain.map((d) => {
    return textures
      .circles()
      .size(20)
      .radius(1)
      .fill("black")
      .background(tempColorScale(d));
  });

  const texture = textures
    .circles()
    .size(20)
    .radius(1)
    .fill("white")
    .background("#bdbdbd");

  onMount(() => {
    textureArray.forEach((d) => d3.select(svg).call(d));
    d3.select(svg).call(texture);
  });

  $: getColor = (d) => {
    if (d.historic === "no") {
      return tempColorScale(d[$currentScenario]);
      // return textureArray[mapTempToTexture(d[$currentScenario])].url();
    } else if (d.historic === "NA") {
      return "#bdbdbd";
      // return texture.url();
    } else {
      return tempColorScale(d[$currentScenario]);
    }
  };

  $: getTemp = (d) => {
    return d === "-1.00" ? "No data" : `${d > 0 ? "+" : ""}${d}°C`;
  };
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
            height={yScale(1) - yScale(0) - 0.8}
            x={0}
            y={yScale(d.Year - $yourBirthYear) + (yScale(1) - yScale(0))}
            stroke={d.Year - $yourBirthYear === currentYIndex
              ? "black"
              : getColor(d)}
            stroke-width={d.Year - $yourBirthYear === currentYIndex ? 2 : 1}
            fill={getColor(d)}
          >
          </rect>
          <text
            x={yearTextOffsetX}
            class="year1"
            y={yScale(d.Year - $yourBirthYear) +
              (yScale(1) - yScale(0)) +
              yearTextOffsetY}>{+$yourBirthYear + i}</text
          >
        {/each}
      </g>
      <g id="background2" transform={`translate(${width / 2},${margin.top})`}>
        {#each $selectedPersonData as d, i (d.Year)}
          <rect
            class="bgRect2"
            id={`bgRect2_${i + 1}`}
            width={width / 2 - margin.left}
            height={yScale(1) - yScale(0) - 0.85}
            x={0}
            y={yScale(d.Year - $selecterPersonBirthYear) +
              (yScale(1) - yScale(0))}
            stroke={d.Year - $selecterPersonBirthYear === currentYIndex
              ? "black"
              : getColor(d)}
            stroke-width={d.Year - $selecterPersonBirthYear === currentYIndex
              ? 2
              : 1}
            fill={getColor(d)}
          >
          </rect>
          <text
            class="year2"
            text-anchor="end"
            x={width / 2 - yearTextOffsetX}
            y={yScale(d.Year - $selecterPersonBirthYear) +
              (yScale(1) - yScale(0)) +
              yearTextOffsetY}>{+$selecterPersonBirthYear + i}</text
          >
        {/each}</g
      >
      {#if currentYIndex <= 99}
        <rect
          class="personBg1"
          x={center - (yScale(1) - yScale(0) - 0.8)}
          y={yScale(currentYIndex + 2) - 48}
          height={yScale(1) - yScale(0) - 0.8}
          width={yScale(1) - yScale(0) - 0.8}
          rx="5"
          ry="5"
          fill={tempColorScale($yourBirthYearTemp)}
          stroke="#000"
          stroke-width="2"
        />
        <rect
          class="personBg2"
          x={center}
          y={yScale(currentYIndex + 2) - 48}
          height={yScale(1) - yScale(0) - 0.8}
          width={yScale(1) - yScale(0) - 0.8}
          rx="5"
          ry="5"
          fill={tempColorScale($selecterPersonBirthYearTemp)}
          stroke="#000"
          stroke-width="2"
        />
        <image
          class="you"
          width={imgDimension * 2}
          height={imgDimension * 2}
          x={center - imgDimension * 2}
          y={yScale(currentYIndex + 2) - 50}
          xlink:href={"baby.png"}
        />
        <image
          class="celebrity"
          width={imgDimension * 2}
          height={imgDimension * 2}
          x={center}
          y={yScale(currentYIndex + 2) - 50}
          xlink:href={"baby.png"}
        />
        <text
          class="temperature1"
          x={center - tempTextOffsetX}
          y={yScale(currentYIndex + 2)}
          font-size={20}
          font-weight={300}
          text-anchor={"start"}
          fill={$yourData[currentYIndex][$currentScenario] >= 3.6
            ? "white"
            : "black"}
          >{getTemp($yourData[currentYIndex][$currentScenario].toFixed(2))}
        </text>

        <text
          class="temperature2"
          x={center + tempTextOffsetX}
          y={yScale(currentYIndex + 2)}
          font-size={20}
          font-weight={300}
          text-anchor={"end"}
          fill={$selectedPersonData[currentYIndex][$currentScenario] >= 3.6
            ? "white"
            : "black"}
          >{getTemp(
            $selectedPersonData[currentYIndex][$currentScenario].toFixed(2)
          )}</text
        >

        <rect
          class="ageRect"
          x={center - ageRectWidth / 2}
          y={yScale(currentYIndex + 2) + 30}
          width={ageRectWidth}
          height={30}
          rx={5}
          ry={5}
          fill={"white"}
          opacity={0.5}
        ></rect>
        <text
          class="ageText"
          x={center}
          y={yScale(currentYIndex + 2) + 50}
          font-size={20}
          font-weight={300}
          text-anchor={"middle"}
          fill={"black"}>{"Age: " + (currentYIndex + 1)}</text
        >
        <text
          class="ageText"
          x={center}
          y={yScale(currentYIndex + 2) + 80}
          font-size={16}
          font-weight={700}
          text-anchor={"middle"}
          fill={"black"}
          opacity={+($yourBirthYear + currentYIndex) === 2023 ? 1 : 0}
          ><tspan x={center} y={yScale(currentYIndex + 2) + 80} dy="0em">
            {"2023 has been confirmed to be the"}
          </tspan>
          <tspan x={center} y={yScale(currentYIndex + 2) + 80} dy="1.1em">
            {"warmest on record, with global"}
          </tspan>
          <tspan x={center} y={yScale(currentYIndex + 2) + 80} dy="2.2em">
            {"temperatures rising around 1.4°C above"}
          </tspan>
          <tspan x={center} y={yScale(currentYIndex + 2) + 80} dy="3.3em">
            {"pre-industrial levels according to WMO."}
          </tspan>
          <tspan x={center} y={yScale(currentYIndex + 2) + 80} dy="4.4em">
            {"After 2023, yearly temperature anomalies are"}
          </tspan>
          <tspan x={center} y={yScale(currentYIndex + 2) + 80} dy="5.5em">
            {`projected under the ${scenarioMap($currentScenario)} scenario.`}
          </tspan>
        </text>
      {/if}
      <text
        class="title1"
        x={center / 2}
        y={50}
        font-size={20}
        font-weight={300}
        text-anchor={"middle"}
      >
        Your climate stripe
      </text>
      <text
        class="title2"
        x={center + center / 2}
        y={50}
        font-size={20}
        font-weight={300}
        text-anchor={"middle"}
      >
        {`${$selectedPerson}'s climate stripe`}
      </text>
    </svg>
  {/if}
</div>

<style>
  #chart {
    width: 100%;
    margin-bottom: 100px;
  }
</style>
