<script>
  import { celebrityData } from "../../assets/data/celebrityData";
  import { data } from "../../assets/data/temperatureData";
  import {
    selectedPersonBirthYear,
    selectedPersonDeathYear,
    selectedPersonBirthYearTemp,
    selectedPersonData,
    selectedPerson,
    currentScenario,
  } from "../../store/store";
  import { tempColorScale } from "../utils";

  let selectedElementIndex = null;

  const update = (event, i) => {
    selectedElementIndex = i;
    $selectedPersonBirthYear =
      event.currentTarget.querySelector(".personYear").textContent;
    $selectedPersonDeathYear = +$selectedPersonBirthYear + 99;
    $selectedPerson = event.currentTarget.querySelector(".person").textContent;
    $selectedPersonData = data.filter(
      (d) =>
        d.Year >= $selectedPersonBirthYear && d.Year <= $selectedPersonDeathYear
    );
    if ($selectedPersonBirthYear <= 2023) {
      if ($selectedPerson === "Future baby") {
        $selectedPersonBirthYearTemp = data.filter(
          (d) => d.Year == $selectedPersonBirthYear
        )[0][$currentScenario];
      } else {
        $selectedPersonBirthYearTemp = data
          .filter((d) => d.Year == $selectedPersonBirthYear)[0]
          .historical.toFixed(2);
      }
    } else {
      $selectedPersonBirthYearTemp = data.filter(
        (d) => d.Year == $selectedPersonBirthYear
      )[0][$currentScenario];
    }
  };
</script>

<div id="celebrityContainer">
  {#each celebrityData as d, i}
    <div
      class="celebrityWrapper {selectedElementIndex === i ? 'selected' : ''}"
      style="background-color: {tempColorScale(d.temp)}"
      on:click={(event) => update(event, i)}
    >
      <img class="icon" id={`icon${d.year}`} src={`./${d.imgName}`} />
      <p class="personYear">{d.year}</p>
      <p class="person">{d.name}</p>
    </div>
  {/each}
</div>

<style>
  .selected {
    font-weight: 700;
    box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.4);
  }
  .personYear {
    font-weight: 700;
  }
  #celebrityContainer {
    text-align: left;
    margin-left: auto;
    margin-right: auto;
  }

  .celebrityWrapper {
    max-width: 750px;
    text-align: center;
    display: inline-block;
    height: 190px;
    width: 190px;
    border-radius: 26px;
    margin: 2px;
  }
  .celebrityWrapper:hover {
    cursor: pointer;
    box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.4);
    transition: all 0.25s ease;
    font-weight: 700;
  }
  .icon {
    margin-top: 20px;
    margin-bottom: -10px;
    height: 120px;
    display: inline-block;
  }

  @media (max-width: 900px) {
    #celebrityContainer {
      text-align: center;
    }
  }
</style>
