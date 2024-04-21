<script>
  import html2canvas from "html2canvas";
  import gsap from "gsap";
  import ScrollTrigger from "gsap/ScrollTrigger";
  import { onMount } from "svelte";
  import Header from "./lib/Header.svelte";
  import Intro from "./lib/Intro.svelte";
  import YearSlider from "./lib/selection/YearSlider.svelte";
  import Celebrity from "./lib/selection/Celebrity.svelte";
  import Scenarios from "./lib/selection/Scenarios.svelte";
  import Timeline from "./lib/Timeline.svelte";
  import Menu from "./lib/Menu.svelte";
  import Modal from "./lib/Modal.svelte";
  import Stripe from "./lib/Stripe.svelte";
  import Profile from "./lib/Profile.svelte";
  import Credit from "./lib/Credit.svelte";
  import Dropdown from "./lib/Dropdown.svelte";
  import { scenarioMap } from "./lib/utils";

  import {
    yourBirthYear,
    yourBirthYearTemp,
    yourDeathYear,
    yourDeathYearTemp,
    selectedPerson,
    selectedPersonBirthYear,
    currentScenario,
    started,
    modalOpen,
  } from "./store/store";

  let tl, tl2;
  $: ageZero = false;

  const start = () => {
    if ($yourBirthYear && $selectedPersonBirthYear && $currentScenario) {
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

    tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#selectionWrapper",
        start: "top top",
        endTrigger: "#chart",
        end: `bottom top-=7900px`,
        pin: "#menu",
        markers: false,
        pinSpacing: false,
        // toggleActions: "play none none reverse",
      },
    });

    tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#chart",
        start: "top top+=200px",
        markers: false,
        pinSpacing: false,
        toggleActions: "play none none reverse",
      },
    });

    tl2.to(".legend", { alpha: 1 });
    tl.to("#menu", { alpha: 0.9 });
  });
</script>

<Modal />
<Header />
<Intro />

<div id="selectionWrapper">
  <Menu />

  <div class="container">
    <div class="row">
      <div class="column" id="birthYearSelection">
        <p class="instruction">
          <span class="number numberYou">1</span>
          <span class="colorYou">Select your birth year</span>
        </p>
        <YearSlider />
      </div>
      <div class="column" id="celebritySelection">
        <p class="instruction" id="celebrityInstruction">
          <span class="number numberCharacter">2</span>
          <span class="colorCharacter"
            >Select one of the following people for comparison
          </span>
        </p>
        <Celebrity />
        <p class="note" id="celebrityNote">
          The background color of the tiles represents the temperature anomaly
          of each individual's birth year.
        </p>
      </div>
    </div>
    <div id="scenarioSelection">
      <div id="sspText">
        <p class="instruction">
          <span class="number numberScenario">3</span>
          <span class="colorScenario">Select a projected climate scenario</span>
        </p>
        <p>
          Shared Socioeconomic Pathways (SSPs) are five climate change scenarios
          that project different societal, demographic, and economic changes up
          to the year 2100. Pick one of these scenarios, ordered from best to
          worst case, to see the projected annual temperature anomalies from
          2023 to 2100.

          <span class="note"
            >The background color of the tiles represents the temperature
            anomaly at 2100 for each scenario.</span
          >
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
        from age {ageZero ? "0 to 99" : "1 to 100"}, under the
        <span id="arrowScenario"
          >{$currentScenario
            ? scenarioMap($currentScenario).toLowerCase()
            : ""}</span
        > scenario</span
      >
    </div>
    <div id="ageCheckbox" class={$started ? "show" : "none"}>
      <input type="checkbox" bind:checked={ageZero} />
      Change to age 0 to 99, depending on your culture
    </div>
  </div>
</div>

<Timeline {ageZero} />

{#if $started}
  <div class="conclusion {$started ? '' : 'none'}">
    <p>
      Download and share your climate colors, ranging from <span id="tempLow"
        >{$yourBirthYearTemp}</span
      >
      °C in <span id="yearLow">{$yourBirthYear}</span> to
      <span id="tempHigh"
        >{$yourDeathYearTemp == "-1.00"
          ? "unsure (no data after 2100)"
          : $yourDeathYearTemp.toString().substring(0, 4) + "°C"}</span
      >
      in
      <span id="yearHigh">{$yourDeathYear}</span>, under the
      <Dropdown />
      scenario after 2023.
    </p>
    <button id="download" class="button" on:click={captureScreenshot}
      >Download</button
    >
    <div class="conclusion {$started ? '' : 'none'}">
      <p>
        For more detail on temperature anomalies, select a year from one of the
        colored stripes below.
      </p>
      <div class="scroll-arrow2">↓</div>
    </div>
  </div>

  <Stripe />

  <Profile {ageZero} />
{/if}

<div class={$started ? "" : "none"}>
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
    column-gap: 120px;
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
    margin-top: 100px;
  }

  #celebritySelection {
    flex: 3;
    max-width: 800px;
    margin-top: 100px;
  }

  #scenarioSelection {
    margin-top: 100px;
  }

  @media (max-width: 900px) {
    #birthYearSelection,
    #celebritySelection {
      flex-basis: 100%;
    }
  }

  .instruction {
    font-weight: 700;
    text-align: left;
    margin: 20px 0px;
  }

  .note {
    font-size: 14px;
    font-style: italic;
  }

  .number {
    display: inline-block;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    text-align: center;
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
    margin: -20px auto 40px auto;
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
    padding: 10px;
    margin: auto;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
  }

  .button {
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    background-color: #fff;
    color: #4f0097;
    text-transform: uppercase;
    padding: 4px 8px;
    width: 130px;
    text-align: center;
    display: block;
    border: 1px solid #4f0097;
    border-radius: 20px;
    font-weight: 600;
    font-size: 16px;
  }

  .button:hover {
    background-color: #4f0097;
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

  .scroll-arrow2 {
    max-width: 200px;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    animation: arrowAnim 5s ease-in-out infinite;
    color: black;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
    z-index: 2;
    padding-bottom: 10px;
  }

  .arrow-text {
    display: inline-block;
    animation: blink 5s ease-in-out infinite;
  }

  #ageCheckbox {
    margin-top: 50px;
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-weight: 300;
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

  @media (max-width: 950px) {
    .row {
      column-gap: 90px;
    }
  }

  @media (max-width: 1202px) {
    #celebrityInstruction {
      text-align: center;
    }
    #celebrityNote {
      margin-left: auto;
      margin-right: auto;
      max-width: 400px;
      text-align: center;
    }
  }
</style>
