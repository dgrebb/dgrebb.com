<script>
  import { fade } from "svelte/transition";
  import { scrollTop } from "@utils";

  export let transitionKey;

  function animateOut() {
    document.body.classList.toggle("animating", true);
  }

  function animateIn() {
    scrollTop();
    setTimeout(() => {
      document.body.classList.toggle("animating", false);
      document.body.classList.toggle("animating-page", false);
    }, 333);
  }
</script>

{#key transitionKey}
  <div
    class="transition-container"
    transition:fade|global={{ duration: 333 }}
    on:outrostart={animateOut}
    on:introend={animateIn}
  >
    <slot />
  </div>
{/key}
