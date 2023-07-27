<script>
  import { fade } from "svelte/transition";

  export let transitionKey;

  function animateOut() {
    document.body.classList.add("animating");
  }

  function animateIn() {
    setTimeout(() => {
      document.body.classList.remove("animating");
      document.body.classList.remove("animating-page");
    }, 333);
  }
</script>

{#key transitionKey}
  <div
    class="transition-container"
    transition:fade={{ duration: 333, delay: 50 }}
    on:outrostart={animateOut}
    on:introend={animateIn}
  >
    <slot />
  </div>
{/key}
