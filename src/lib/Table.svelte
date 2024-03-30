<script>
  export let person;
  export let image;
  export let year;
  export let currentAge;
  export let birthYearColor;
  export let birthYearTemp;
  export let currentYearColor;
  export let currentYearTemp;
  export let diffTempColor;
  export let diffTemp;
</script>

<img src={image} />
<table>
  <thead>
    <tr style="background-color: {'white'}">
      <td>{person} at age {currentAge} ({year})</td>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: {birthYearColor}">
      <td>Temp anomaly at birth year: {birthYearTemp}</td>
    </tr>
    <tr style="background-color: {currentYearColor}">
      <td>Temp anomaly at age {currentAge}: {currentYearTemp}</td>
    </tr>
    <tr style="background-color: {diffTempColor}">
      <td>Temp anomaly difference between two years: {diffTemp}</td>
    </tr>
  </tbody>
</table>

<style>
  table {
    width: 100%;
    text-align: center;
  }

  td {
    padding: 10px;
  }

  img {
    display: block;
    height: 150px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
