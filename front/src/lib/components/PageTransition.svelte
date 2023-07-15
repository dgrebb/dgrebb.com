<script>
  import { browser } from "$app/environment";
  import { fade } from "svelte/transition";
  
  export let pathname;

  function animateOut() {
    if (browser) document.body.classList.add("animating");
  }

  function animateIn() {
    setTimeout(() => {
      if (browser) document.body.classList.remove("animating");
    }, 100);
  }

</script>

{#key pathname}
  <div
    class="transition-container"
    transition:fade={{ duration: 300, delay: 50 }}
    on:outrostart={animateOut}
    on:introend={animateIn}
  >
    <slot />
  </div>
{/key}
