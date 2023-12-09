<script>
  import { scenarioData } from "../../assets/data/scenarioData";
  import { currentScenario } from "../../store/store";

  function update(event, id) {
    $currentScenario = id;
  }
</script>

<div id="scenariosContainer">
  {#each scenarioData as d}
    <div class="scenario" on:click={() => update(event, d.id)}>
      <p>{d.name}</p>
      <img class="icon" src="./baby.png" />
      <p>{d.description}</p>
    </div>
  {/each}
  <p>Scenario selected: {$currentScenario}</p>
</div>

<style>
  #scenariosContainer {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  .scenario {
    text-align: center;
    display: inline-block;
    height: 180px;
    width: 180px;
    border-radius: 10px;
    z-index: 1000;
  }

  .scenario:hover {
    font-weight: 700;
    cursor: pointer;
  }

  .scenario:nth-child(1) {
    background-color: #fff5f0;
  }

  .scenario:nth-child(2) {
    background-color: #fee0d2;
  }

  .scenario:nth-child(3) {
    background-color: #fc9272;
  }

  .scenario:nth-child(4) {
    background-color: #cb181d;
  }

  .scenario:nth-child(5) {
    background-color: #67000d;
    color: white;
  }
  .icon {
    width: 100px;
    display: inline-block;
  }
</style>
