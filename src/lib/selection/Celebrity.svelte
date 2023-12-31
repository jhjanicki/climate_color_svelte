<script>
  import { celebrityData } from "../../assets/data/celebrityData";
  import { data } from "../../assets/data/temperatureData";
  import {
    selecterPersonBirthYear,
    selecterPersonDeathYear,
    selecterPersonBirthYearTemp,
    selectedPersonData,
    selectedPerson,
    currentScenario,
  } from "../../store/store";

  let selectedElementIndex = null;

  const update = (event, i) => {
    selectedElementIndex = i;
    $selecterPersonBirthYear =
      event.currentTarget.querySelector(".personYear").textContent;
    $selecterPersonDeathYear = +$selecterPersonBirthYear + 99;
    $selectedPerson = event.currentTarget.querySelector(".person").textContent;
    $selectedPersonData = data.filter(
      (d) =>
        d.Year >= $selecterPersonBirthYear && d.Year <= $selecterPersonDeathYear
    );
    // THIS PART NEED TO CHANGE so it reflects the scenario too when it changes, also breaks when the user selects celebrity before scenario
    if ($selecterPersonBirthYear <= 2023) {
      $selecterPersonBirthYearTemp = data
        .filter((d) => d.Year == $selecterPersonBirthYear)[0]
        .historical.toFixed(2);
    } else {
      $selecterPersonBirthYearTemp = data
        .filter((d) => d.Year == $selecterPersonBirthYear)[0]
        [$currentScenario].toFixed(2);
    }
  };
</script>

<div id="celebrityContainer">
  {#each celebrityData as d, i}
    <div
      class="celebrityWrapper {selectedElementIndex === i ? 'selected' : ''}"
      style="background-color: {d.color}"
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
  }
  #celebrityContainer {
    text-align: left;
    margin-left: auto;
    margin-right: auto;
  }

  .celebrityWrapper {
    text-align: center;
    display: inline-block;
    height: 185px;
    width: 185px;
    border-radius: 10px;
    margin: 4px 2px;
  }
  .celebrityWrapper:hover {
    cursor: pointer;
    box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.4);
    transition: all 0.25s ease;
    font-weight: 700;
  }
  .icon {
    width: auto;
    height: auto;
    display: inline-block;
  }
</style>
