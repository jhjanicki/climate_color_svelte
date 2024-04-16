<script>
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
  import { tempColorScale, getImage } from "../../lib/utils.js";

  let slided = false;
  let yourImage = "old.png";

  const updateSlider = (event) => {
    slided = true;
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

    yourImage = getImage($yourAge);
  };
</script>

<div
  id="birthYearContainer"
  style="background-color: {slided
    ? tempColorScale($yourBirthYearTemp)
    : '#39b5b5'}; }"
>
  <div id="imgContainer">
    <img id="you" class="icon" src={yourImage} />
  </div>
  <Range on:change={updateSlider} id="slider" />
  <p id="birthYearInstruction" class="note">
    The background color represents the temperature anomaly of your birth year.
    <br />Years range from 1924 to 2023.
  </p>
</div>

<style>
  #birthYearContainer {
    border-radius: 26px;
    height: calc(100% - 90px);
    max-height: 400px;
  }

  #birthYearContainer img {
    margin: 10px 0px;
    width: 160px;
  }

  #birthYearContainer #imgContainer {
    margin: 20px auto;
  }

  #birthYearInstruction {
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    text-align: left;
    padding: 0px 10px;
  }

  #birthYearText {
    text-align: center;
    margin: 10px;
  }

  .note {
    font-size: 14px;
    font-style: italic;
  }

  @media (max-width: 900px) {
    #birthYearContainer {
      height: 100%;
    }
    #birthYearInstruction {
      padding: 10px;
    }
  }
</style>
