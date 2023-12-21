<script>
</script>

<div id="menu">
  <div id="menuTitleWrapper">
    <p id="menuTitle" class="menuTitleItem">Selection summary</p>
  </div>
  <div id="menuInner">
    <p>
      <span class="numberSmall">1</span><b>Your birth year:</b>
      <span id="birthyearMenu"></span>
    </p>
    <hr />
    <p>
      <span class="numberSmall">2</span><b>Famous person:</b><br />
      <span id="celebrityMenu"></span>
    </p>
    <hr />
    <p>
      <span class="numberSmall">3</span><b>Scenario:</b>
      <span id="scenarioMenu"></span>
    </p>
  </div>
</div>

<style>
  #menu {
    opacity: 0.85;
    width: 260px;
    min-height: 50px;
    position: absolute;
    top: 0px;
    right: 0px;
    background-color: white;
    box-shadow: 1px 1px 5px -3px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    /* transition: all 1s ease; */
    background: linear-gradient(
      to bottom,
      rgba(103, 0, 13, 0.5),
      rgba(103, 0, 13, 0.25) 54px,
      rgba(255, 255, 255, 0.8) 54px,
      rgba(255, 255, 255, 0.8) 100%
    );
    z-index: 1000;
  }

  #menuInner {
    padding: 20px;
    transition: 1s all ease;
  }

  #menuInner p {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .close {
    display: none;
    transition: 1s all ease;
  }

  #menuTitleWrapper {
    margin-left: auto;
    margin-right: auto;
  }

  #menuTitle {
    font-weight: 700;
    text-align: center;
    padding-top: 13px;
    margin-left: 40px;
  }

  .menuTitleItem {
    display: inline-block;
    vertical-align: middle;
    color: #67000d;
  }

  .numberSmall {
    display: inline-block;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    text-align: center;
    background-color: #67000d;
    color: white;
    margin-right: 10px;
    padding-top: 4px;
  }

  @media (max-width: 700px) {
    #menu {
      display: none;
    }
  }
</style>
