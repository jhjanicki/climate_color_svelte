<script>
  import YearSlider from "./lib/selection/YearSlider.svelte";
  import Characters from "./lib/selection/Celebrity.svelte";
  import Scenarios from "./lib/selection/Scenarios.svelte";
  import Timeline from "./lib/Timeline.svelte";
  import "bootstrap/dist/css/bootstrap.min.css";

  import {
    yourBirthYear,
    selecterPersonBirthYear,
    currentScenario,
    yourData,
    selectedPersonData,
  } from "./store/store";

  function start() {
    if ($yourBirthYear && $selecterPersonBirthYear && $currentScenario) {
      // updateRects();
      // startTimeline();
    } else {
      // $(".modal").css("display", "block");
    }
  }
</script>

<div id="selectionWrapper">
  <div class="header">
    <div class="headerText">
      <h1>What is your Climate Color?</h1>
      <h3>
        Zoom in and compare your climate stripe from cradle to grave tk subhed
        that tells you what we are doing here
      </h3>
      <p>By Julia Janicki, Daisy Chung & Jacki Whisenant</p>
    </div>
  </div>
  <div class="intro">
    <p>
      Each of the colored stripes represent the annual temperature change
      relative to pre-industrial levels, meaning the long-term average of
      1850-1900. Up until 2023 (in 2023 up to October only) we are seeing
      historical temperatures, while after 2023 the colors show projected
      temperatures based on the five Shared Socioeconomic Pathways (SSPs).
    </p>
    <img src="./stripe.svg" />
  </div>

  <div class="container">
    <div class="row text-center">
      <div class="col-md-3" id="birthYearSelection">
        <p class="instruction">
          <span class="number">1</span> Select your birth year
        </p>
        <YearSlider />
      </div>

      <div class="col-md-9" id="celebritySelection">
        <p class="instruction">
          <span class="number">2</span> Select a one of the following characters
        </p>
        <Characters />
      </div>
    </div>
    <div class="row text-center">
      <div class="col-md-12">
        <div id="sspText">
          <p class="instruction">
            <span class="number">3</span> Select projected climate scenario
          </p>
          <p>
            Shared Socioeconomic Pathways (SSPs) are climate change scenarios
            projecting societal, demographic and economic changes up to 2100. In
            the SSP labels, the first number refers to the assumed shared
            socio-economic pathway (1: Sustainability, 2: Middle of the Road, 3:
            Regional Rivalry, 4: Inequality, 5: Fossil-fueled Development), and
            the second refers to the approximate global effective radiative
            forcing (ERF) in 2100. Pick one of these scenarios to see the
            proejcted annual temperature after 2023, up until 2100, depending on
            the socioeconomic global changes.
          </p>
        </div>
        <Scenarios />
      </div>
    </div>
  </div>
  <p id="start" class="button" on:click={start}>start</p>
</div>

<div class="scrollerLine">
  <Timeline />
</div>

<style>
  .header {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("./bg.png");
    background-repeat: no-repeat;
    background-position: center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  .headerText {
    text-align: center;
    color: white;
    padding: 100px;
    background-color: rgba(0, 0, 0, 0.25);
    width: 100%;
  }

  .headerText h1 {
    font-size: 80px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .headerText h3 {
    font-size: 30px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .headerText p {
    margin-top: 30px;
  }

  .intro {
    max-width: 650px;
    margin: auto;
    padding: 40px 20px;
    font-size: 20px;
    line-height: 26px;
    text-align: justify;
  }

  .container {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
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
    padding-top: 1px;
    font-weight: 400;
  }

  #sspText {
    max-width: 900px;
    text-align: justify;
    margin-left: auto;
    margin-right: auto;
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
</style>
