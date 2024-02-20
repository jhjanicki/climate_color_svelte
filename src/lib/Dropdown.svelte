<script>
  import { currentScenario } from "../store/store";
  import { scenarioMap } from "../lib/utils";

  let active = false;
  let scenarios = ["ssp119", "ssp126", "ssp245", "ssp370", "ssp585"];

  const toggleDropdown = () => {
    console.log("toggled");
    active = !active;
  };

  const closeDropdown = (scenario) => {
    console.log(scenario);
    $currentScenario = scenario;
    active = false;
  };
</script>

<div class={active ? "select-menu active" : "select-menu"}>
  <div class="select-menu-button" on:click={toggleDropdown}>
    <span class="select-menu-text">{scenarioMap($currentScenario)}</span>
    <img id="carrot" class={active ? "flip" : ""} src="carrot.svg" />
  </div>
  <ul class="options">
    {#each scenarios as d}
      <li class="option" on:click={() => closeDropdown(d)}>
        <span class="optionText">{scenarioMap(d)}</span>
      </li>
    {/each}
  </ul>
</div>

<style>
  .select-menu {
    max-width: 220px;
    margin: 20px auto;
  }

  .select-menu-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /* remove default arrow */
    margin: 18px 0px;
    border: 1px solid #d2d2d2;
    border-radius: 0;
    font-size: 16px;
    line-height: 24px;
    font-weight: bold;
    cursor: pointer;
    padding: 8px;
    background-size: auto;
  }

  .options {
    position: absolute;
    width: 220px;
    overflow-y: auto;
    max-height: 295px;
    padding: 10px;
    margin-top: -20px;
    border: 1px solid #d2d2d2;
    border-radius: 0;
    background: #fff;
    display: none;
  }

  .option {
    height: 40px;
    cursor: pointer;
    text-align: center;
    padding-top: 5px;
    background: #fff;
  }

  .option:hover {
    background: #1696d2;
    color: #fff;
  }

  .select-menu.active .options {
    display: inherit;
    padding: 0px;
    display: block;
    opacity: 0;
    z-index: 10;
    animation-name: fadeInUp;
    -webkit-animation-name: fadeInUp;
    animation-duration: 0.4s;
    animation-fill-mode: both;
    -webkit-animation-duration: 0.4s;
    -webkit-animation-fill-mode: both;
  }

  #carrot {
    width: 15px;
    margin-top: 8px;
    float: right;
  }

  .flip {
    transform: rotate(180deg);
    transition: 0.3s transform ease;
  }

  @keyframes fadeInUp {
    from {
      transform: translate3d(0, 30px, 0);
    }

    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @keyframes fadeInDown {
    from {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }

    to {
      transform: translate3d(0, 20px, 0);
      opacity: 0;
    }
  }
</style>
