<script>
  import { scenarioData } from "../../assets/data/scenarioData";
  import { data } from "../../assets/data/temperatureData";

  import {
    selecterPersonBirthYear,
    currentScenario,
    selecterPersonBirthYearTemp,
    yourDeathYearTemp,
    yourDeathYear,
  } from "../../store/store";

  let selectedElementIndex = null;

  const update = (event, id, i) => {
    selectedElementIndex = i;
    $currentScenario = id;

    if ($selecterPersonBirthYear <= 2023) {
      $selecterPersonBirthYearTemp = data
        .filter((d) => d.Year == $selecterPersonBirthYear)[0]
        .historical.toFixed(2);
    } else {
      $selecterPersonBirthYearTemp = data
        .filter((d) => d.Year == $selecterPersonBirthYear)[0]
        [$currentScenario].toFixed(2);
    }

    $yourDeathYearTemp = data
      .filter((d) => d.Year == $yourDeathYear)[0]
      [$currentScenario].toFixed(2);
  };
</script>

<div id="scenariosContainer">
  {#each scenarioData as d, i}
    <div
      class="scenarioWrapper {selectedElementIndex === i ? 'selected' : ''}"
      on:click={(event) => update(event, d.id, i)}
    >
      <p>{d.name}</p>
      <img class="icon" src="./baby.png" />
      <p>{d.description}</p>
    </div>
  {/each}
</div>

<style>
  .selected {
    font-weight: 700;
  }
  .scenarioWrapper {
    text-align: center;
    display: inline-block;
    height: 185px;
    width: 185px;
    border-radius: 10px;
    margin: 4px 2px;
  }

  .scenarioWrapper:nth-child(1) {
    background-color: #fff5f0;
  }

  .scenarioWrapper:nth-child(2) {
    background-color: #fee0d2;
  }

  .scenarioWrapper:nth-child(3) {
    background-color: #fc9272;
  }

  .scenarioWrapper:nth-child(4) {
    background-color: #cb181d;
  }

  .scenarioWrapper:nth-child(5) {
    background-color: #67000d;
    color: white;
  }

  .scenarioWrapper:hover {
    cursor: pointer;
    box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.4);
    transition: all 0.25s ease;
    font-weight: 700;
  }
</style>
