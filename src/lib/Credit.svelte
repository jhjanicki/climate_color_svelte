<div class="row">
  <p class="column">
    <b>Data:</b>
    In this project we are visualizing the annual temperature anomalies relative
    to the pre-industrial levels (1850-1900), using both historical (until 2023)
    and projected (after 2023) data. We used historical data from the World Meteorological
    Organization, which is the mean of six datasets: HadCRUT5, NOAA, GlobalTemp,
    GISTEMP, ERA5 1, and JRA55. We also referenced the "State of the Global Climate
    2023" report. The data for the projected temperature anomalies based on the five
    SSP scenarios after 2023 are from the IPCC Sixth Assessment report, which is
    the most updated scenario data we can find. Ideally the historical and projected
    data would be from the same source, but IPCC historical data is not as updated
    as the WMO data so we decided to combine two sources, if someonoe has access
    to more updated projected temperatures after 2024 for the SSP scenarios data
    we'd be happy to use the more updated data. The original climate stripes idea
    was developed by Ed Hawkins, this is one of the many adaptations.
  </p>
  <br /><br />
  <p class="column">
    <b>Credit:</b>
    Data / Development / Narrative: Julia Janicki
    <br />
    Design / illustrtion: Daisy Chung
    <br />
    Text Edit: Joyce Chou
    <br />
    Additional help: Jacki Whisenant
  </p>
</div>

<style>
  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    max-width: 75vw;
    padding: 20px;
    margin: auto;
    padding: 40px 20px;
    font-size: 18px;
    line-height: 25px;
    text-align: left;
    column-gap: 100px;
  }

  .column {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
  }

  @media (max-width: 700px) {
    .row {
      column-gap: 20px;
      max-width: 90vw;
    }
  }

  @media (max-width: 500px) {
    .column {
      flex-basis: 100%;
    }
  }
</style>
