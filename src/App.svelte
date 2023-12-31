<script>
  import html2canvas from "html2canvas";
  import gsap from "gsap";
  import ScrollTrigger from "gsap/ScrollTrigger";
  import { onMount } from "svelte";
  import Header from "./lib/Header.svelte";
  import Intro from "./lib/Intro.svelte";
  import YearSlider from "./lib/selection/YearSlider.svelte";
  import Characters from "./lib/selection/Celebrity.svelte";
  import Scenarios from "./lib/selection/Scenarios.svelte";
  import Timeline from "./lib/Timeline.svelte";
  import Menu from "./lib/Menu.svelte";
  import Modal from "./lib/Modal.svelte";
  import Stripe from "./lib/Stripe.svelte";
  import Credit from "./lib/Credit.svelte";
  import { modalOpen } from "./store/store";
  import { formatScenarioText, scenarioMap } from "./lib/utils";

  import {
    yourBirthYear,
    yourBirthYearTemp,
    yourDeathYear,
    yourDeathYearTemp,
    selectedPerson,
    selecterPersonBirthYear,
    currentScenario,
    started,
  } from "./store/store";

  const start = () => {
    if ($yourBirthYear && $selecterPersonBirthYear && $currentScenario) {
      $started = true;
    } else {
      $started = false;
      $modalOpen = true;
    }
  };

  const captureScreenshot = () => {
    const divToCapture = document.getElementById("chart2");
    html2canvas(divToCapture).then(function (canvas) {
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "screenshot.png";
      link.click();
    });
  };

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: "#selectionWrapper",
      start: "top top",
      end: `bottom ${126}px`,
      pin: "#menu",
      markers: false,
    });
  });
</script>

<Modal />
<Header />

<div id="selectionWrapper">
  <Intro />
  <Menu />

  <div class="container">
    <div class="row">
      <div class="column" id="birthYearSelection">
        <p class="instruction">
          <span class="number">1</span> Select your birth year
        </p>
        <YearSlider />
      </div>
      <div class="column" id="celebritySelection">
        <p class="instruction">
          <span class="number">2</span> Select a one of the following characters
        </p>
        <Characters />
      </div>
    </div>
    <div id="scenarioSelection">
      <div id="sspText">
        <p class="instruction">
          <span class="number">3</span> Select projected climate scenario
        </p>
        <p>
          Shared Socioeconomic Pathways (SSPs) are climate change scenarios
          projecting societal, demographic and economic changes up to 2100.
          According to IPCC, in the SSP labels, the first number refers to the
          assumed shared socio-economic pathway (1: Sustainability, 2: Middle of
          the Road, 3: Regional Rivalry, 4: Inequality, 5: Fossil-fueled
          Development), and the second refers to the approximate global
          effective radiative forcing (ERF) in 2100. Pick one of these scenarios
          to see the proejcted annual temperature anomalies after 2023 up until
          2100.
        </p>
      </div>
      <Scenarios />
    </div>
    <div class={$started ? "none" : "show"}>
      <p id="start" class="button" on:click={start}>start</p>
    </div>
    <div class="scroll-arrow {$started ? 'show' : 'none'}">
      ↓<br />
      <span class="arrow-text"
        >Compare your temperatures with <span id="arrowPerson"
          >{$selectedPerson}</span
        >
        under the
        <span id="arrowScenario"
          >{$currentScenario ? formatScenarioText($currentScenario) : ""}</span
        > scenario</span
      >
    </div>
  </div>
</div>

<Timeline />

{#if $started}
  <div class="conclusion {$started ? '' : 'none'}">
    <p>
      Download your climate colors, which ranges from <span id="tempLow"
        >{$yourBirthYearTemp}</span
      >
      in <span id="yearLow">{$yourBirthYear}</span> to
      <span id="tempHigh"
        >{$yourDeathYearTemp === "-1.00"
          ? "unsure (no data after 2100)"
          : $yourDeathYearTemp}</span
      >
      in
      <span id="yearHigh">{$yourDeathYear}</span>, under the
      <span id="ssp">{scenarioMap($currentScenario)}</span>
      scenario after 2023.
    </p>
    <button id="download" class="button" on:click={captureScreenshot}
      >Download</button
    >
  </div>
{/if}

<Stripe />

<div class="conclusion {$started ? '' : 'none'}">
  <Credit />
</div>

<style>
  #selectionWrapper {
    position: relative;
  }

  .container {
    width: 75vw;
    margin-left: auto;
    margin-right: auto;
  }

  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    column-gap: 60px;
  }

  .column {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
  }

  #birthYearSelection {
    text-align: center;
    flex: 1;
  }

  #celebritySelection {
    flex: 3;
  }

  @media (max-width: 900px) {
    #birthYearSelection,
    #celebritySelection {
      flex-basis: 100%;
    }
  }

  .instruction {
    font-weight: 700;
    color: #67000d;
    text-align: left;
    margin: 20px 0px;
  }

  .number {
    display: inline-block;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    text-align: center;
    background-color: #67000d;
    color: white;
    margin-right: 10px;
    padding-top: 4px;
    font-weight: 400;
  }

  #sspText {
    max-width: 900px;
    text-align: justify;
    margin-bottom: 20px;
  }

  .button {
    margin-left: auto;
    margin-right: auto;
    text-transform: uppercase;
    padding: 4px 8px;
    width: 100px;
    text-align: center;
    display: block;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    font-weight: 600;
    font-size: 16px;
  }

  .button:hover {
    transition: all 0.5s ease;
    border: 1px solid rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }

  .conclusion {
    max-width: 500px;
    padding: 20px;
    margin: auto;
    padding: 40px 20px;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
  }

  .button {
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    color: #67000d;
    text-transform: uppercase;
    padding: 4px 8px;
    width: 130px;
    text-align: center;
    display: block;
    border: 1px solid #67000d;
    border-radius: 20px;
    font-weight: 600;
    font-size: 16px;
  }

  .button:hover {
    background-color: #67000d;
    color: white;
    transition: all 0.5s ease;
    border: 1px solid white;
    cursor: pointer;
  }

  .scroll-arrow {
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 50px;
    animation: arrowAnim 5s ease-in-out infinite;
    color: black;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
    z-index: 2;
  }

  .arrow-text {
    display: inline-block;
    animation: blink 5s ease-in-out infinite;
  }
  @keyframes arrowAnim {
    0%,
    100% {
      transform: translateY(1rem);
    }
    50% {
      transform: translateY(-1rem);
    }
  }

  #arrowPerson,
  #arrowScenario {
    font-weight: 700;
  }
</style>
