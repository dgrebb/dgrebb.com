<script>
  export let transitionKey;
  export let duration = 500;
  export let delay = 600;
  export let classList = false;

  function doIt() {
    return {
      duration,
    };
  }

  function animateOut(node) {
    document.body.classList.toggle('animating-page', true);
  }

  function animateIn(node) {
    setTimeout(() => {
      document.body.classList.toggle('animating', false);
      document.body.classList.toggle('animating-page', false);
    }, delay);
  }
</script>

{#key transitionKey}
  <div
    class="transition-fade-container {classList ? classList : ''}"
    transition:doIt|global
    on:outrostart={animateOut}
    on:introstart={animateIn}
  >
    <slot />
  </div>
{/key}
