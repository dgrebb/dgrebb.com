<script>
  import { page } from "$app/stores";
  import { fade } from "svelte/transition";
  import { scrollTop } from "@utils";

  export let transitionKey;
  export let classList = false;

  function animateOut() {
    document.body.classList.add("animating-page");
  }

  function animateIn() {
    setTimeout(() => {
      document.body.classList.remove("animating-page");
    }, 333);
  }

</script>

{#key (transitionKey)}
  <div
    class="page-transition-container {classList ? classList : ''}"
    transition:fade={{ duration: 333, delay: 50 }}
    on:outrostart={animateOut}
    on:introend={animateIn}
  >
    <slot />
  </div>
{/key}
