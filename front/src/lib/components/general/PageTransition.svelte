<script>
  import { navigating } from '$app/stores';
  import { isElementOutsideViewport, motionless, scrollTop } from '@utils';

  export let transitionKey;
  let to;

  /**
   * Calculates the animation duration based on motionless condition.
   * @function
   * @returns {Object} Object with a duration property.
   */
  function doIt() {
    const isMotionless = motionless();
    return {
      duration: isMotionless ? 0 : 333,
    };
  }

  /**
   * Initiates the outro animation.
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves after the animation starts.
   */
  async function animateOutroStart() {
    if (motionless()) return;
    const header = document.querySelector('.header');
    const isHeaderOutsideViewport = isElementOutsideViewport(header);
    to = $navigating?.to.route.id;
    document.body.classList.toggle('animating', true);
    if (isHeaderOutsideViewport) {
      header.classList.toggle('scroll-transition', true);
    }
  }

  /**
   * Finalizes the outro animation.
   * @function
   */
  function animateOutroEnd() {
    if (to === '/') return;
    scrollTop();
  }
  /**
   * Initiates the intro animation.
   * @function
   */
  function animateIntroStart() {
    if (motionless()) return;
  }

  /**
   * Finalizes the intro animation using requestAnimationFrame for better performance.
   * @function
   */
  function animateIntroEnd() {
    if (motionless()) return;

    const header = document.querySelector('.header');

    requestAnimationFrame(() => {
      header.classList.remove('scroll-transition');
      document.body.classList.remove('animating', 'animating-page');
    });
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
