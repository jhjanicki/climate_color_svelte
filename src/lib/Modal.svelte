<script>
  import { modalOpen } from "../store/store";
</script>

<div class="modal {$modalOpen ? 'show' : 'none'}">
  <div class="modal-content">
    <span id="closeModal" on:click={(event) => ($modalOpen = false)}
      >&times;</span
    >
    <p id="modalText">Select the three options</p>
  </div>
</div>

<style>
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgba(0, 0, 0, 0.3);
  }

  .modal-content {
    position: relative;
    background-color: #fefefe;
    margin-left: auto;
    margin-right: auto;
    top: 50%;
    transform: translate(0, -50%);
    padding: 20px;
    box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.5);
    width: 500px;
    border: none;
    border-radius: 20px;
  }

  .modal-content p {
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  /* The Close Button */
  #closeModal {
    font-size: 24px;
    display: inline-block;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    text-align: center;
    background-color: #67000d;
    color: white;
    margin-right: 10px;
    transition: all 0.5s ease;
    transform: rotate(90deg);
    position: absolute;
    right: 0px;
    top: 10px;
  }

  #closeModal:hover,
  #closeModal:focus {
    background-color: #ae9184;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.5s ease;
  }
</style>
