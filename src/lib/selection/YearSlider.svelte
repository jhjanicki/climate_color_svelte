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
  } from "../../store/store";

  let tempColorScale = d3
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

  function updateSlider(event) {
    $yourBirthYear = event.detail.value + 1923;
    $yourDeathYear = $yourBirthYear + 99;
    $yourAge = 2023 - $yourBirthYear;
    $yourData = data.filter(
      (d) => d.Year >= $yourBirthYear && d.Year <= $yourDeathYear
    );
    $yourBirthYearTemp = data.filter((d) => d.Year == $yourBirthYear)[0]
      .historical;
  }

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

  #birthYearContainer #slider,
  #birthYearContainer img {
    margin: 10px 0px;
  }

  #birthYearContainer #imgContainer {
    margin: 20px auto;
  }

  #birthYearInstruction {
    text-align: left;
    margin: auto 20px;
  }

  #sliderWrapper {
    padding: 0px 10px;
  }

  #birthYearText {
    text-align: center;
    margin: 10px;
  }
</style>
