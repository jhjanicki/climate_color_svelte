<script>
  import {
    yourBirthYear,
    selectedPerson,
    selectedPersonBirthYear,
    currentScenario,
  } from "../store/store";
  import { scenarioMap } from "./utils";

  let width = 200;
</script>

<div id="menu" bind:clientWidth={width}>
  <div id="menuInner">
    <div class="inline selection">
      <span class="numberSmall numberYou">1</span><b>Your birth year:</b>
      <span id="birthyearMenu" class="menuItem"
        >{$yourBirthYear ? $yourBirthYear : ""}</span
      >
    </div>
    {#if width < 700}
      <br />
    {/if}
    <div class="inline selection">
      <span class="numberSmall numberCharacter">2</span><b>Famous person:</b>
      <span id="celebrityMenu" class="menuItem"
        >{$selectedPerson
          ? `${$selectedPerson}, born in ${$selectedPersonBirthYear}`
          : ""}</span
      >
    </div>
    {#if width < 700}
      <br />
    {/if}
    <div class="inline selection">
      <span class="numberSmall numberScenario">3</span><b>Scenario:</b>
      <span id="scenarioMenu" class="menuItem"
        >{$currentScenario ? scenarioMap($currentScenario) : ""}</span
      >
    </div>
    {#if width < 800 || (width > 1100 && width < 1600)}
      <br />
    {/if}
    <div class="inline" id="legendWrapper">
      <span class="legend">-0.4°C </span><img
        class="legend"
        id="legendMini"
        src="./stripe2.svg"
      />
      <span class="legend"> 4.8°C</span>
    </div>
  </div>
</div>

<style>
  #menu {
    opacity: 0;
    width: 100%;
    height: auto;
    position: absolute;
    top: -1px;
    right: 0px;
    background-color: white;
    box-shadow: 1px 1px 5px -3px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    /* transition: all 1s ease; */
    background: white;
    z-index: 1;
  }

  #menuInner {
    width: 75vw;
    margin-left: auto;
    margin-right: auto;
  }

  .menuItem {
    margin-right: 20px;
  }

  .numberSmall {
    display: inline-block;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    text-align: center;
    color: white;
    margin-right: 10px;
    padding-top: 2px;
    vertical-align: middle;
  }

  .legend {
    padding-top: 5px;
    padding-bottom: 5px;
    vertical-align: middle;
    opacity: 0;
  }

  #legendMini {
    max-width: 250px;
  }

  .inline {
    display: inline;
    height: auto;
  }

  @media (max-width: 700px) {
    #menuInner {
      width: 100%;
      font-size: 14px;
    }
    .selection {
      margin: 3px 0px 0px 10px;
      display: inline-block;
    }

    #legendWrapper {
      margin: 2px 0px 0px 10px;
    }
  }
</style>
