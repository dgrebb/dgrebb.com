<script>
  import { fade } from "svelte/transition";
  import { scrollTop } from "@utils";

  export let pathname;

  function animateOut() {
    document.body.classList.add("animating");
  }

  function animateIn() {
    setTimeout(() => {
      document.body.classList.remove("animating");
    }, 333);
  }
</script>

{#key pathname}
  <div
    class="transition-container"
    transition:fade={{ duration: 333, delay: 50 }}
    on:outrostart={animateOut}
    on:introend={animateIn}
  >
    <slot />
  </div>
{/key}
