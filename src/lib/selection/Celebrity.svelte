<script>
  import { celebrityData } from "../../assets/data/celebrityData";
  import { data } from "../../assets/data/temperatureData";
  import {
    selecterPersonBirthYear,
    selecterPersonDeathYear,
    selectedPersonData,
    selectedPerson,
  } from "../../store/store";

  function update(event) {
    $selecterPersonBirthYear =
      event.currentTarget.querySelector(".personYear").textContent;
    $selecterPersonDeathYear = +$selecterPersonBirthYear + 99;
    $selectedPerson = event.currentTarget.querySelector(".person").textContent;
    $selectedPersonData = data.filter(
      (d) =>
        d.Year >= $selecterPersonBirthYear && d.Year <= $selecterPersonDeathYear
    );
  }
</script>

<div id="celebrityContainer">
  {#each celebrityData as d, i}
    <div class="celebrityWrapper" on:click={update}>
      <img class="icon" id={`icon${d.year}`} src={`./${d.imgName}`} />
      <p class="personYear">{d.year}</p>
      <p class="person">{d.name}</p>
    </div>
  {/each}
  <p>Compared to {$selectedPerson}, born in {$selecterPersonBirthYear}</p>
</div>

<style>
  p {
    margin: 0px;
  }

  #celebrityContainer {
    text-align: center;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .celebrityWrapper {
    text-align: center;
    display: inline-block;
    height: 180px;
    width: 180px;
    border-radius: 10px;
  }

  .celebrityWrapper:hover {
    font-weight: 700;
    cursor: pointer;
  }

  .celebrityWrapper:nth-child(1) {
    background-color: #2171b5;
  }

  .celebrityWrapper:nth-child(2) {
    background-color: #2171b5;
  }

  .celebrityWrapper:nth-child(3) {
    background-color: #2171b5;
  }

  .celebrityWrapper:nth-child(4) {
    background-color: #6baed6;
  }

  .celebrityWrapper:nth-child(5) {
    background-color: #deebf7;
  }

  .celebrityWrapper:nth-child(6) {
    background-color: #deebf7;
  }

  .celebrityWrapper:nth-child(7) {
    background-color: #deebf7;
  }

  .celebrityWrapper:nth-child(8) {
    background-color: #fff5f0;
  }

  .icon {
    width: auto;
    height: auto;
    display: inline-block;
  }
</style>
