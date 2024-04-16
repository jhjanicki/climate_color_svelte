<div class="row">
  <p class="column">
    <b>Data:</b>
    In this project, we visualize the annual temperature anomalies relative to the
    pre-industrial levels (1850-1900), using both historical (up to 2023) and projected
    (from 2023 onwards) data. We used historical data from the World Meteorological
    Organization (WMO), calculating the mean of six datasets: HadCRUT5, NOAA, GlobalTemp,
    GISTEMP, ERA5 1, and JRA55. We also referenced the WMO’s "State of the Global
    Climate 2023" report. The data for the projected temperature anomalies based
    on the five SSP scenarios after 2023 are from the IPCC Sixth Assessment report.
    Ideally, the historical and projected data would come from the same source, but
    IPCC’s historical data is not as up-to-date as WMO’s data. Because of this, we’ve
    chosen to combine two sources. However, if more updated projected temperatures
    after 2024 for the SSP scenarios are available, we'd be happy to use this data.
    The original climate stripes concept was developed by Ed Hawkins; our adaptation
    is one of many.
  </p>
  <br /><br />
  <p class="column">
    <b>Credit:</b>
    Data / Development / Interaction design / Narrative: Julia Janicki
    <br />
    Design / Illustrtion: Daisy Chung
    <br />
    Text edit: Joyce Chou
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

    p {
      font-size: 14px;
    }
  }

  @media (max-width: 500px) {
    .column {
      flex-basis: 100%;
    }
  }
</style>
