<script>
  import { navigating } from '$app/stores';
  import { isElementOutsideViewport, motionless, scrollTop } from '@utils';

  export let transitionKey;
  let to;

  function doIt() {
    return {
      duration: motionless() === true ? 0 : 500,
    };
  }

  async function animateOutroStart() {
    if (motionless() === true) return;
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

  function animateIntroStart() {
    if (motionless() === true) return;
  }

  function animateIntroEnd() {
    if (motionless() === true) return;
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
    transition:doIt|global
    on:outrostart={animateOutroStart}
    on:outroend={animateOutroEnd}
    on:introstart={animateIntroStart}
    on:introend={animateIntroEnd}
  >
    <slot />
  </div>
{/key}
