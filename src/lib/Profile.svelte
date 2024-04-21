<script>
  import {
    currentScenario,
    yourData,
    yourBirthYearTemp,
    yourAgeProfile,
    yearProfile,
    selectedPerson,
    selectedPersonBirthYear,
    selectedPersonBirthYearTemp,
    selectedPersonData,
    started,
    stripeCliked,
  } from "../store/store";
  import Table from "./Table.svelte";
  import { tempColorScale, getTemp, getImage } from "../lib/utils";

  export let ageZero;

  $: getColor = (d) => {
    return tempColorScale(d);
  };

  $: currentYourTemp = $yourAgeProfile
    ? $yourData[$yourAgeProfile - 1][$currentScenario]
    : "";

  $: currentSelectedPersonTemp =
    $yourAgeProfile &&
    $selectedPersonData[$yourAgeProfile - 1][$currentScenario]
      ? $selectedPersonData[$yourAgeProfile - 1][$currentScenario]
      : "";
</script>

{#if started && $stripeCliked && $yearProfile}
  <div id="profile">
    <div id="yourProfile" class="item">
      <Table
        person={"You"}
        year={$yearProfile}
        image={getImage($yourAgeProfile)}
        currentAge={ageZero ? $yourAgeProfile - 1 : $yourAgeProfile}
        birthYearColor={getColor($yourBirthYearTemp)}
        birthYearTemp={getTemp($yourBirthYearTemp, true)}
        currentYearColor={currentYourTemp == "-1.00"
          ? "#bdbdbd"
          : getColor(currentYourTemp)}
        currentYearTemp={currentYourTemp == "-1.00"
          ? "No data"
          : getTemp(currentYourTemp, true)}
        diffTempColor={currentYourTemp == "-1.00"
          ? "#bdbdbd"
          : getColor(currentYourTemp - $yourBirthYearTemp)}
        diffTemp={currentYourTemp == "-1.00"
          ? "No data"
          : getTemp(currentYourTemp - $yourBirthYearTemp, true)}
      ></Table>
    </div>
    <div id="personProfile" class="item">
      <Table
        person={$selectedPerson}
        year={+$selectedPersonBirthYear + +$yourAgeProfile - 1}
        image={`${$selectedPerson.replaceAll(" ", "_")}.png`}
        currentAge={ageZero ? $yourAgeProfile - 1 : $yourAgeProfile}
        birthYearColor={getColor($selectedPersonBirthYearTemp)}
        birthYearTemp={getTemp($selectedPersonBirthYearTemp, true)}
        currentYearColor={currentSelectedPersonTemp == "-1.00"
          ? "#bdbdbd"
          : getColor(currentSelectedPersonTemp)}
        currentYearTemp={currentSelectedPersonTemp == "-1.00"
          ? "No data"
          : getTemp(currentSelectedPersonTemp, true)}
        diffTempColor={currentSelectedPersonTemp == "-1.00"
          ? "#bdbdbd"
          : getColor(currentSelectedPersonTemp - $selectedPersonBirthYearTemp)}
        diffTemp={currentSelectedPersonTemp == "-1.00"
          ? "No data"
          : getTemp(
              currentSelectedPersonTemp - $selectedPersonBirthYearTemp,
              true
            )}
      ></Table>
    </div>
  </div>
{/if}

<style>
  #profile {
    display: flex;
    flex-wrap: wrap;
    width: 90vw;
    max-width: 800px;
    margin-bottom: 100px;
    margin-left: auto;
    margin-right: auto;
  }

  .item {
    flex-basis: 50%;
    box-sizing: border-box;
  }
</style>
