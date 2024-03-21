<script>
  import * as d3 from "d3";
  import {
    currentScenario,
    yourData,
    yourBirthYear,
    started,
    yourAgeProfile,
    yearProfile,
    stripeCliked,
  } from "../store/store";
  import { tempColorScale } from "../lib/utils";

  let width = 200;

  const height = 500;
  const margin = {
    top: 50,
    bottom: 30,
  };

  $: xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
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

  let hoveredData;
</script>

<div id="chart2" bind:clientWidth={width}>
  {#if $yourData && $started}
    <svg {width} height={height + margin.top + margin.bottom}>
      <g transform={"translate(0," + margin.top + ")"}>
        {#each $yourData as d, i (d.Year)}
          <rect
            class="bgRect3"
            id={`bgRect3_${i + 1}`}
            width={hoveredData == d
              ? xScale(2) - xScale(1) - 0.5
              : xScale(2) - xScale(1) + 0.3}
            height={height - 2}
            x={xScale(d.Year - $yourBirthYear)}
            y={1}
            stroke={hoveredData == d ? "black" : "none"}
            stroke-width={hoveredData == d ? 1.2 : 0}
            fill={getColor(d)}
            on:mouseover={() => (hoveredData = d)}
            on:mouseout={() => (hoveredData = "")}
            on:click={() => {
              $yourAgeProfile = i + 1;
              $yearProfile = d.Year;
              $stripeCliked = true;
            }}
          >
          </rect>
        {/each}
        <text id="yourBirthYear" x={10} y={-10}>
          {$yourBirthYear}
        </text>
        <text id="yourDeathYear" x={width - 40} y={-10}>
          {$yourBirthYear + 99}
        </text>
      </g>
    </svg>
  {/if}

  <!-- <svg {width} height={height + margin.top + margin.bottom}>
    <g transform={"translate(0," + margin.top + ")"}>
      {#each histData as d, i (d.Year)}
        <rect
          class="bgRect3"
          id={`bgRect3_${i + 1}`}
          width={xScale2(2) - xScale2(1) + 0.3}
          {height}
          x={xScale2(d.Year)}
          y={0}
          stroke="none"
          fill={getColor(d)}
        >
        </rect>
      {/each}
    </g>
  </svg> -->
</div>

<style>
  #chart2 {
    width: 100%;
  }
</style>
