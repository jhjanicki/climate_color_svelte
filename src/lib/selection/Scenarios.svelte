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

  const update = (event, id, i) => {
    $currentScenario = id;

    if ($selecterPersonBirthYear <= 2023) {
      $selecterPersonBirthYearTemp = data
        .filter((d) => d.Year == $selecterPersonBirthYear)[0]
        .historical.toFixed(2);
    } else {
      $selecterPersonBirthYearTemp = $selecterPersonBirthYear
        ? data
            .filter((d) => d.Year == $selecterPersonBirthYear)[0]
            [$currentScenario].toFixed(2)
        : "";
    }

    $yourDeathYearTemp = $yourDeathYear
      ? data
          .filter((d) => d.Year == $yourDeathYear)[0]
          [$currentScenario].toFixed(2)
      : "";
  };
</script>

<div id="scenariosContainer">
  {#each scenarioData as d, i}
    <div
      class="scenarioWrapper {$currentScenario === d.id ? 'selected' : ''}"
      on:click={(event) => update(event, d.id, i)}
    >
      <p class="textTop">{d.name}</p>
      <img class="icon" src="./scenario{i + 1}.png" />
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
    height: 190px;
    width: 190px;
    border-radius: 26px;
    margin: 4px 2px;
  }
  .icon {
    height: 120px;
    display: inline-block;
  }

  .textTop {
    padding-top: 10px;
  }

  .scenarioWrapper:nth-child(1) {
    background-color: #fedd93;
  }

  .scenarioWrapper:nth-child(2) {
    background-color: #fec700;
  }

  .scenarioWrapper:nth-child(3) {
    background-color: #ff7f1f;
  }

  .scenarioWrapper:nth-child(4) {
    background-color: #b00a8c;
  }

  .scenarioWrapper:nth-child(5) {
    background-color: #4f0097;
    color: white;
  }

  .scenarioWrapper:hover {
    cursor: pointer;
    box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.4);
    transition: all 0.25s ease;
    font-weight: 700;
  }

  @media (max-width: 900px) {
    #scenariosContainer {
      text-align: center;
    }
  }
</style>
