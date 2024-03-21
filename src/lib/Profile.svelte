<script>
  import * as d3 from "d3";
  import {
    currentScenario,
    yourData,
    yourBirthYearTemp,
    yourBirthYear,
    yourAgeProfile,
    yearProfile,
    started,
    stripeCliked,
  } from "../store/store";
  import { tempColorScale, getTemp } from "../lib/utils";

  let width = 200;

  $: getColor = (d) => {
    return tempColorScale(d);
  };

  $: currentYourTemp = $yourAgeProfile
    ? $yourData[$yourAgeProfile][$currentScenario]
    : "";
</script>

{#if started && $stripeCliked}
  <div id="profile" bind:clientWidth={width}>
    <div id="yourProfile">
      <img src="./teen.png" />

      <table>
        <thead>
          <tr style="background-color: {'white'}">
            <td>You at age {$yourAgeProfile}</td>
          </tr>
        </thead>
        <tbody>
          <tr style="background-color: {getColor($yourBirthYearTemp)}">
            <td
              >Temp anomaly at birth year: {getTemp(
                $yourBirthYearTemp,
                true
              )}</td
            >
          </tr>
          <tr style="background-color: {getColor(currentYourTemp)}">
            <td
              >Temp anomaly at age {$yourAgeProfile}: {currentYourTemp ==
              "-1.00"
                ? "No data"
                : getTemp(currentYourTemp, true)}</td
            >
          </tr>
          <tr
            style="background-color: {getColor(
              currentYourTemp - $yourBirthYearTemp
            )}"
          >
            <td
              >Difference between anomalies: {currentYourTemp == "-1.00"
                ? "No data"
                : getTemp(currentYourTemp - $yourBirthYearTemp, true)}</td
            >
          </tr>
        </tbody>
      </table>
    </div>
    <div id="personProfile"></div>
  </div>
{/if}

<style>
  #profile {
    max-width: 700px;
    margin-bottom: 100px;
    margin-left: auto;
    margin-right: auto;
  }
  table {
    width: 100%;
  }

  td {
    padding: 10px;
  }
  img {
    width: 180px;
  }
</style>
