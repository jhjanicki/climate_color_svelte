<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import {
    selectedPerson,
    currentScenario,
    yourData,
    selectedPersonData,
    yourBirthYear,
    selectedPersonBirthYear,
    yourBirthYearTemp,
    selectedPersonBirthYearTemp,
    started,
  } from "../store/store";
  import { tempColorScale, scenarioMap, getImage } from "../lib/utils";

  import { gsap } from "gsap";
  import TextPlugin from "gsap/TextPlugin";

  const margin = {
    top: 40,
    right: 0,
    bottom: 150,
    left: 0,
  };

  let width = 200;
  const height = 8000 - margin.top - margin.bottom;
  $: center = width / 2;
  $: selectedPersonImg = $selectedPerson
    ? $selectedPerson.replaceAll(" ", "_") + ".png"
    : "";

  const imgDimension = 40;
  const ageRectWidth = 80;
  const tempTextOffsetX = 145;
  const yearTextOffsetX = 10;
  const yearTextOffsetY = 45;
  const bgYOffset = 38;
  const imgYOffset = 40;

  const yScale = d3
    .scaleLinear()
    .domain([1, 100])
    .range([margin.top, height - margin.bottom]);

  // const indices = Array.from({ length: 10 }, (_, i) => i);

  const handleScroll = () => {
    if (!svg) return;
    const { top = 0 } = svg.getBoundingClientRect() || {};
    imageOffset = Math.max(0, -top + 300); // add 300 here to make the scroll more centered vertically...should get it dynamically
  };

  let svg;
  let imageOffset = 0;
  $: currentYIndex = Math.floor(yScale.invert(imageOffset));
  $: currentYourTemp =
    currentYIndex <= 99 ? $yourData[currentYIndex][$currentScenario] : "";
  $: currentPersonTemp =
    currentYIndex <= 99
      ? $selectedPersonData[currentYIndex][$currentScenario]
      : "";

  onMount(() => {
    gsap.registerPlugin(TextPlugin);

    // Add event listener on component mount
    window.addEventListener("resize", reverse);

    // Cleanup function
    return () => {
      // Remove event listener on component unmount
      window.removeEventListener("resize", reverse);
    };
  });

  $: getColor = (d) => {
    if (d.historic === "no") {
      return tempColorScale(d[$currentScenario]);
    } else if (d.historic === "NA") {
      return "#bdbdbd";
    } else {
      return tempColorScale(d[$currentScenario]);
    }
  };

  $: getTemp = (d, addSigns) => {
    return addSigns
      ? d == "-1.00"
        ? "No data"
        : `${d > 0 ? "+" : ""}${d.toFixed(2)}°C`
      : d == "-1.00"
        ? "No data"
        : `${Math.abs(d.toFixed(2))}°C`;
  };

  let clickable = true;
  let tl2 = gsap.timeline();
  let tlRing = gsap.timeline();

  const mouseoverEl = () => {
    if (clickable) {
      moveElementHover(tl2, ".personBg1", -10);
      moveElementHover(tl2, ".personBg2", 10);
      moveElementHover(tl2, ".you", -10);
      moveElementHover(tl2, ".celebrity", 10);
      moveElementHover(tl2, ".temperature1", -10);
      moveElementHover(tl2, ".temperature2", 10);

      tlRing.to(".ring", 1, {
        opacity: 0.75,
        stagger: {
          each: 0.5,
          repeat: -1,
        },
      });
      tlRing.play();
    }
  };

  const moveElementHover = (tl, element, xPos) => {
    tl.to(
      element,
      0.4,
      {
        x: xPos,
      },
      0
    );
  };

  const mouseLeaveEl = () => {
    if (clickable) {
      tlRing.pause();
      gsap.to(".ring", 1, {
        opacity: 0,
      });
      moveElementHover(tl2, ".personBg1", 0);
      moveElementHover(tl2, ".personBg2", 0);
      moveElementHover(tl2, ".you", 0);
      moveElementHover(tl2, ".celebrity", 0);
      moveElementHover(tl2, ".temperature1", 0);
      moveElementHover(tl2, ".temperature2", 0);
    }
  };

  const getText = (text) => {
    if (text === "text1") {
      if (+$yourBirthYear + +currentYIndex > 2100) {
        if (width >= 1300) {
          return "Oops, there is no data available after year 2100";
        } else {
          return "Oops, no data after 2100";
        }
      } else {
        if (width >= 1300) {
          return `The temperature ${
            +$yourBirthYear + +currentYIndex <= 2023 ? "was" : "will be"
          } ${getTemp(currentYourTemp - $yourBirthYearTemp, false)} ${
            currentYourTemp - $yourBirthYearTemp >= 0 ? "higher" : "lower"
          } compared to when you were born`;
        } else {
          return `${getTemp(currentYourTemp - $yourBirthYearTemp, false)} ${
            currentYourTemp - $yourBirthYearTemp >= 0 ? "higher" : "lower"
          } than in ${$yourBirthYear}`;
        }
      }
    } else {
      if (+$selectedPersonBirthYear + +currentYIndex > 2100) {
        if (width >= 1300) {
          return "Oops, there is no data available after year 2100";
        } else {
          return "Oops, no data after 2100";
        }
      } else {
        if (width >= 1300) {
          return `... and ${
            +$selectedPersonBirthYear + +currentYIndex <= 2023 ? "" : "will be "
          }${getTemp(
            currentPersonTemp - $selectedPersonBirthYearTemp,
            false
          )} ${
            currentPersonTemp - $selectedPersonBirthYearTemp >= 0
              ? "higher"
              : "lower"
          } compared to when ${
            $selectedPerson !== "8 billionth baby" &&
            $selectedPerson !== "Future baby"
              ? $selectedPerson.split(" ")[0]
              : $selectedPerson
          } ${$selectedPerson === "Future baby" ? "will be" : "was"} born`;
        } else {
          return `${getTemp(
            currentPersonTemp - $selectedPersonBirthYearTemp,
            false
          )} ${
            currentPersonTemp - $selectedPersonBirthYearTemp >= 0
              ? "higher"
              : "lower"
          } than in ${$selectedPersonBirthYear}`;
        }
      }
    }
  };

  const rotate = () => {
    if (clickable) {
      let tl = gsap.timeline();
      disableScroll();
      tlRing.pause();
      gsap.to(".ring", 1, {
        opacity: 0,
      });

      hideElements(tl, [".ageRect", ".ageText"]);

      moveElement(tl, ".personBg1", 0.4, 45, 38, -55);
      moveElement(tl, ".you", 0.4, 0, 40, -55);
      moveElement(tl, ".personBg2", 0.4, 45, -38, 55);
      moveElement(tl, ".celebrity", 0.4, 0, -40, 55);

      hideElements(tl, [".temperature1", ".temperature2"]);
      showElement(tl, "#tempText1");
      showElement(tl, "#tempText2");

      animateText(tl, "#tempText1", getText("text1"));
      animateText(tl, "#tempText2", getText("text2"));

      showElement(tl, ".circle", 4.5, 0.7);
      showElement(tl, ".circleX", 4.5);

      gsap.to(".ageText2023", 0.3, {
        y: 40,
      });

      clickable = false;
    }
  };

  const reverse = () => {
    clickable = true;
    let tl = gsap.timeline();

    showElements(tl, [".temperature1", ".temperature2"]);
    hideElements(tl, ["#tempText1", "#tempText2"]);
    hideElements(tl, [".circle", ".circleX"]);

    resetText(tl, ["#tempText1", "#tempText2"]);

    enableScroll();

    showElements(tl, [".ageRect"], 0.3);
    showElements(tl, [".ageText"]);

    moveElement(tl, ".personBg1", 0.2, 0, 0, 0);
    moveElement(tl, ".you", 0.2, 0, 0, 0);
    moveElement(tl, ".personBg2", 0.2, 0, 0, 0);
    moveElement(tl, ".celebrity", 0.2, 0, 0, 0);
    gsap.to(".ageText2023", 0.3, {
      y: 0,
    });
  };

  function disableScroll() {
    gsap.to("body", 0.3, {
      overflow: "hidden",
    });
  }

  function enableScroll() {
    gsap.to("body", 0.3, {
      overflow: "auto",
    });
  }

  function hideElements(timeline, elements) {
    elements.forEach((element) => {
      timeline.to(
        element,
        0,
        {
          opacity: 0,
        },
        0
      );
    });
  }

  function showElements(timeline, elements, value = 1) {
    elements.forEach((element) => {
      timeline.to(
        element,
        0,
        {
          opacity: value,
        },
        0
      );
    });
  }

  function moveElement(timeline, element, duration, rotation, x, y) {
    timeline.to(
      element,
      duration,
      {
        rotation,
        transformOrigin: "center center",
        x,
        y,
      },
      0
    );
  }

  function showElement(timeline, element, delay = 0, value = 1) {
    timeline.to(
      element,
      0,
      {
        opacity: value,
        display: "block",
      },
      delay
    );
  }

  function animateText(timeline, element, value) {
    timeline.to(element, {
      text: {
        value,
      },
      duration: 1.8,
      delay: 0.2,
      ease: "none",
    });
  }

  function resetText(timeline, element) {
    timeline.to(
      element,
      0,
      {
        text: {
          value: "",
        },
        opacity: 0,
      },
      0
    );
  }
</script>

<svelte:window on:scroll={handleScroll} />

<div id="chart" bind:clientWidth={width}>
  {#if $yourData && $selectedPersonData && $yourBirthYear && $selectedPersonBirthYear && $currentScenario && $started}
    <svg
      id="svg"
      {width}
      height={height + margin.top}
      transform={"translate(0," + margin.top + ")"}
      bind:this={svg}
    >
      <g id="background" transform={`translate(0,${margin.top})`}>
        {#each $yourData as d, i (d.Year)}
          <rect
            class={`bgRect1 rect1_${i}`}
            id={`bgRect1_${d.Year}`}
            width={width / 2 - margin.left}
            height={yScale(1) - yScale(0) - 0.8}
            x={0}
            y={yScale(d.Year - $yourBirthYear) + (yScale(1) - yScale(0))}
            stroke={getColor(d)}
            stroke-width={d.Year - $yourBirthYear === currentYIndex ? 1.5 : 1}
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
            class={`bgRect2 rect2_${i}`}
            id={`bgRect2_${d.Year}`}
            width={width / 2 - margin.left}
            height={yScale(1) - yScale(0) - 0.85}
            x={0}
            y={yScale(d.Year - $selectedPersonBirthYear) +
              (yScale(1) - yScale(0))}
            stroke={getColor(d)}
            stroke-width={d.Year - $selectedPersonBirthYear === currentYIndex
              ? 1.5
              : 1}
            fill={getColor(d)}
          >
          </rect>
          <text
            class="year2"
            text-anchor="end"
            x={width / 2 - yearTextOffsetX}
            y={yScale(d.Year - $selectedPersonBirthYear) +
              (yScale(1) - yScale(0)) +
              yearTextOffsetY}>{+$selectedPersonBirthYear + i}</text
          >
        {/each}</g
      >
      {#if currentYIndex <= 99}
        <g
          class="currentRect"
          on:click={() => rotate()}
          on:mouseenter={() => mouseoverEl()}
          on:mouseleave={() => mouseLeaveEl()}
        >
          <rect
            {width}
            height={yScale(1) - yScale(0) - 0.85}
            x="0"
            y={yScale(currentYIndex + 2) - bgYOffset}
            fill="rgba(0,0,0,0)"
            stroke="#000"
            stroke-width="2"
          ></rect>
          <rect
            class="personBg1"
            x={center - (yScale(1) - yScale(0) - 0.8)}
            y={yScale(currentYIndex + 2) - bgYOffset}
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
            y={yScale(currentYIndex + 2) - bgYOffset}
            height={yScale(1) - yScale(0) - 0.8}
            width={yScale(1) - yScale(0) - 0.8}
            rx="5"
            ry="5"
            fill={tempColorScale($selectedPersonBirthYearTemp)}
            stroke="#000"
            stroke-width="2"
          />
          <image
            class="you"
            width={imgDimension * 2}
            height={imgDimension * 2}
            x={center - imgDimension * 2}
            y={yScale(currentYIndex + 2) - imgYOffset}
            xlink:href={getImage(currentYIndex)}
          />
          <image
            class="celebrity"
            width={imgDimension * 2}
            height={imgDimension * 2}
            x={center}
            y={yScale(currentYIndex + 2) - imgYOffset}
            xlink:href={selectedPersonImg}
          />
          <circle
            class="ring"
            cx={center}
            cy={yScale(currentYIndex + 2)}
            r="15"
            fill="white"
            opacity="0"
          ></circle>
        </g>

        <text
          class="temperature1"
          x={center - tempTextOffsetX}
          y={yScale(currentYIndex + 2) + 6}
          font-size={20}
          font-weight={300}
          text-anchor={"start"}
          fill={currentYourTemp >= 2.8 ? "white" : "black"}
          >{getTemp(currentYourTemp, true)}
        </text>
        <text
          class="temperature2"
          x={center + tempTextOffsetX}
          y={yScale(currentYIndex + 2) + 6}
          font-size={20}
          font-weight={300}
          text-anchor={"end"}
          fill={currentPersonTemp >= 2.8 ? "white" : "black"}
          >{getTemp(currentPersonTemp, true)}</text
        >
        <text
          id="tempText1"
          x={width >= 800 ? 80 : 50}
          y={yScale(currentYIndex + 2) + 6}
          font-size={width >= 800 ? 20 : 16}
          font-weight={300}
          text-anchor={"start"}
          fill={currentYourTemp >= 2.8 ? "white" : "black"}
        ></text>

        <text
          id="tempText2"
          x={width >= 800 ? center + 60 : center + 30}
          y={yScale(currentYIndex + 2) + 6}
          font-size={width >= 800 ? 20 : 16}
          font-weight={300}
          text-anchor={"start"}
          fill={currentPersonTemp >= 2.8 ? "white" : "black"}
        ></text>

        <rect
          class="ageRect"
          x={+($yourBirthYear + currentYIndex) === 2023
            ? center - 160
            : center - ageRectWidth / 2}
          y={yScale(currentYIndex + 2) + 40}
          width={+($yourBirthYear + currentYIndex) === 2023
            ? 320
            : ageRectWidth}
          height={+($yourBirthYear + currentYIndex) === 2023 ? 170 : 30}
          rx={5}
          ry={5}
          fill={"white"}
          opacity={0.5}
        ></rect>
        <text
          class="ageText"
          x={center}
          y={yScale(currentYIndex + 2) + 60}
          font-size={20}
          font-weight={300}
          text-anchor={"middle"}
          fill={"black"}>{"Age: " + (currentYIndex + 1)}</text
        >
        <text
          class="ageText2023"
          x={center}
          y={yScale(currentYIndex + 2) + 80}
          font-size={16}
          font-weight={700}
          text-anchor={"middle"}
          fill={"black"}
          opacity={+($yourBirthYear + currentYIndex) === 2023 ? 1 : 0}
        >
          <tspan x={center} y={yScale(currentYIndex + 2) + 90} dy="0em">
            {"2023 has been confirmed to be the"}
          </tspan>
          <tspan x={center} y={yScale(currentYIndex + 2) + 90} dy="1.1em">
            {"warmest on record, with global"}
          </tspan>
          <tspan x={center} y={yScale(currentYIndex + 2) + 90} dy="2.2em">
            {"temperatures rising around 1.45°C"}
          </tspan>
          <tspan x={center} y={yScale(currentYIndex + 2) + 90} dy="3.3em">
            {"above the 1850-1900 average, according"}
          </tspan>
          <tspan x={center} y={yScale(currentYIndex + 2) + 90} dy="4.4em">
            {" to WMO. After 2023, yearly temperature"}
          </tspan>
          <tspan x={center} y={yScale(currentYIndex + 2) + 90} dy="5.5em">
            {`anomalies are projected under the`}
          </tspan>
          <tspan x={center} y={yScale(currentYIndex + 2) + 90} dy="6.6em">
            {`${scenarioMap($currentScenario).toLowerCase()} scenario.`}
          </tspan>
        </text>

        <circle
          class="circle"
          cx={center}
          cy={yScale(currentYIndex + 2)}
          r={20}
          fill="white"
          stroke="black"
          opacity="0"
          display="none"
        ></circle>
        <text
          class="circleX"
          x={center}
          y={yScale(currentYIndex + 2) + 10}
          font-size={30}
          font-weight={300}
          text-anchor={"middle"}
          fill="black"
          opacity="0"
          display="none"
          on:click={(event) => reverse()}>✕</text
        >
      {/if}
      <text
        class="title1"
        x={center / 2}
        y={60}
        font-size={20}
        font-weight={300}
        text-anchor={"middle"}
      >
        Your climate stripe
      </text>
      <text
        class="title2"
        x={center + center / 2}
        y={60}
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
  .circleX:hover,
  .currentRect:hover {
    cursor: pointer;
  }
</style>
