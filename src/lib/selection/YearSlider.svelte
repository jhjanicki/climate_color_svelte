<script>
  import * as d3 from "d3";
  import Range from "./Range.svelte";
  import { data } from "../../assets/data/temperatureData";
  import {
    yourBirthYear,
    yourDeathYear,
    yourAge,
    yourData,
    yourBirthYearTemp,
    yourDeathYearTemp,
    currentScenario,
  } from "../../store/store";
  import { tempColorScale } from "../../lib/utils.js";

  const updateSlider = (event) => {
    $yourBirthYear = event.detail.value + 1923;
    $yourDeathYear = $yourBirthYear + 99;
    $yourAge = 2023 - $yourBirthYear;
    $yourData = data.filter(
      (d) => d.Year >= $yourBirthYear && d.Year <= $yourDeathYear
    );
    $yourBirthYearTemp = data.filter((d) => d.Year == $yourBirthYear)[0]
      .historical;
    $yourBirthYearTemp = +$yourBirthYearTemp.toFixed(2);

    $yourDeathYearTemp = data.filter((d) => d.Year == $yourDeathYear)[0][
      $currentScenario
    ];
  };

  let src = "baby.png";

  $: {
    // Update the src value based on multiple conditions
    if ($yourAge >= 0 && $yourAge < 4) {
      src = "baby.png";
    }
    if ($yourAge >= 4 && $yourAge < 11) {
      src = "kid.png";
    }
    if ($yourAge >= 11 && $yourAge < 20) {
      src = "teen.png";
    }
    if ($yourAge >= 20 && $yourAge < 60) {
      src = "adult.png";
    }
    if ($yourAge >= 60 && $yourAge <= 100) {
      src = "old.png";
    }
  }
</script>

<div
  id="birthYearContainer"
  style="background-color: {tempColorScale(
    $yourBirthYearTemp
  )}; border: {$yourBirthYearTemp ? 'none' : '0.5px solid black'}"
>
  <div id="imgContainer">
    <img id="you" class="icon" {src} />
  </div>
  <Range on:change={updateSlider} id="slider" />
  <p id="birthYearText">Your birth year: {$yourBirthYear || ""}</p>
  <p id="birthYearInstruction">
    Background color represents the temperature anomaly of your birth year. Year
    from 1923 to 2023.
  </p>
</div>

<style>
  #birthYearContainer {
    border-radius: 10px;
    height: 100%;
    max-height: 400px;
  }

  #birthYearContainer img {
    margin: 10px 0px;
  }

  #birthYearContainer #imgContainer {
    margin: 20px auto;
  }

  #birthYearInstruction {
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    padding: 10px;
  }

  #birthYearText {
    text-align: center;
    margin: 10px;
  }
</style>
