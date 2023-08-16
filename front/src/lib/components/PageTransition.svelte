<script>
  import { navigating } from '$app/stores';
  import { isElementOutsideViewport, scrollTop } from '@utils';
  import { fade } from 'svelte/transition';

  export let transitionKey;
  let to;

  async function animateOutroStart() {
    const header = document.querySelector('.header');
    to = $navigating?.to.route.id;
    document.body.classList.toggle('animating', true);
    if (isElementOutsideViewport(header)) {
      header.classList.toggle('scroll-transition', true);
    }
  }

  function animateOutroEnd() {
    if (to === '/') return;
    scrollTop();
  }

  function animateIntroStart() {}

  function animateIntroEnd() {
    setTimeout(() => {
      header.classList.toggle('scroll-transition', false);
      document.body.classList.toggle('animating', false);
      document.body.classList.toggle('animating-page', false);
    }, 333);
  }
</script>

{#key transitionKey}
  <div
    class="transition-container"
    transition:fade|global={{ duration: 333 }}
    on:outrostart={animateOutroStart}
    on:outroend={animateOutroEnd}
    on:introstart={animateIntroStart}
    on:introend={animateIntroEnd}
  >
    <slot />
  </div>
{/key}
