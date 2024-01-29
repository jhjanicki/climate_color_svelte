<script>
  import {
    yourBirthYear,
    selectedPerson,
    selecterPersonBirthYear,
    currentScenario,
  } from "../store/store";
  import { formatScenarioText } from "./utils";
</script>

<div id="menu">
  <div id="menuInner">
    <span class="numberSmall numberYou">1</span><b>Your birth year:</b>
    <span id="birthyearMenu" class="menuItem"
      >{$yourBirthYear ? $yourBirthYear : ""}</span
    >

    <span class="numberSmall numberCharacter">2</span><b>Famous person:</b>
    <span id="celebrityMenu" class="menuItem"
      >{$selectedPerson
        ? `${$selectedPerson}, born in ${$selecterPersonBirthYear}`
        : ""}</span
    >

    <span class="numberSmall numberScenario">3</span><b>Scenario:</b>
    <span id="scenarioMenu" class="menuItem"
      >{$currentScenario ? formatScenarioText($currentScenario) : ""}</span
    >
  </div>
</div>

<style>
  #menu {
    opacity: 0;
    width: 100%;
    height: auto;
    position: absolute;
    top: 0px;
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
    width: 30px;
    height: 30px;
    text-align: center;
    color: white;
    margin-right: 10px;
    padding-top: 4px;
  }

  @media (max-width: 700px) {
    #menuInner {
      width: 100%;
    }
  }
</style>
