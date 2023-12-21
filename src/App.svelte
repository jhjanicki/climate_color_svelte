<script>
  import YearSlider from "./lib/selection/YearSlider.svelte";
  import Characters from "./lib/selection/Celebrity.svelte";
  import Scenarios from "./lib/selection/Scenarios.svelte";
  import Timeline from "./lib/Timeline.svelte";
  import Menu from "./lib/Menu.svelte";
  // import "bootstrap/dist/css/bootstrap.min.css";

  import {
    yourBirthYear,
    selecterPersonBirthYear,
    currentScenario,
    yourData,
    selectedPersonData,
    started,
  } from "./store/store";

  function start() {
    if ($yourBirthYear && $selecterPersonBirthYear && $currentScenario) {
      $started = true;
    } else {
      $started = false;
      // $(".modal").css("display", "block");
    }
  }
</script>

<div class="header">
  <div class="headerText">
    <h1>A lifetime of change</h1>
    <h3>Leaving the future generation hope for a better planet</h3>
    <p>By Julia Janicki, Daisy Chung. Additional work by Jacki Whisenant</p>
  </div>
</div>

<div id="selectionWrapper">
  <div class="intro">
    <p class="textBlock">
      Just over the last few years, wildfires, heatwaves, extreme weather events
      have become visibly more frequent, with ever increasing record-breaking
      temperatures. These are symptoms of change that has been happening in the
      background for some time now. How does our current world compared to that
      when we were born? How has our planet changed throuout the course of our
      lives, short on the scale of a planet but long given the pace of global
      warming? Finally let's think about how our collective decisions can shape
      a future for the youth and humans who are not yet born.
      <br /><br />
      Each of the stripes below represent the annual temperature change relative
      to pre-industrial levels, meaning the long-term average of 1850-1900. Until
      2023 (up to October only) we are seeing historical temperature anomalies calculated
      by the WMO, while after 2023 the colors show projected temperatures based on
      the five Shared Socioeconomic Pathways according to IPCC.
    </p>
    <img id="legend" src="./stripe.svg" />
  </div>
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
    <p id="start" class="button" on:click={start}>start</p>
  </div>
</div>

<Timeline />

<div class="conclusion {$started ? '' : 'none'}">
  <p>
    Download your climate colors, which ranges from <span id="tempLow"></span>
    in <span id="yearLow"></span> to
    <span id="tempHigh"></span> in <span id="yearHigh"></span>, under the
    <span id="ssp"></span>
    scenario after year 2023.
  </p>
  <button id="download" class="button">Download</button>
</div>

<div id="chart2"></div>

<div class="conclusion {$started ? '' : 'none'}">
  <p>
    <b>Data:</b><br />
    Annual temperature anomaly relative to pre-industrial levels (1850-1900), until
    2023 (up to October only) the data is from World Meteorological Organization,
    which is the mean of five datasets: HadCRUT5, NOAA, GlobalTemp, GISTEMP, ERA5
    1, and JRA55. The data of the projected temperature anomalies based on the five
    SSP scenarios after 2023 are from the IPCC Sixth Assessment report. Ideally the
    historical and projected data would be from the same sources, but IPCC historical
    data is not as updated as the WMO data. The original climate stripes idea was
    developed by Ed Hawkins, this is one of the many adaptations.
  </p>
  <br /><br />
  <p>
    <b>Credit:</b><br />
    Data / Development / Narrative: Julia Janicki
    <br />
    Design / icons: Daisy Chung
    <br />
    Additional icon help: Jacki Whisenant
  </p>
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
    position: relative;
  }

  .textBlock {
    max-width: 700px;
    margin: auto;
    padding: 40px 20px;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
  }

  #legend {
    margin-bottom: 30px;
    max-width: 550px;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

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

  .none {
    display: none;
  }
</style>
