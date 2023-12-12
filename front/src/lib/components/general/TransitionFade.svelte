<script>
  /**
   * @script
   * This script controls a transition effect for a fade container in a SvelteKit application.
   * @module FadeTransition
   */

  import { motionless } from '@utils';

  /**
   * Key for the transition.
   * @type {string}
   */
  export let transitionKey;

  /**
   * Duration of the transition.
   * @type {number}
   * @default 333
   */
  export let duration = 333;

  /**
   * Delay before the transition starts.
   * @type {number}
   * @default 600
   */
  export let delay = 600;

  /**
   * Optional class list for the fade container.
   * @type {string|false}
   * @default false
   */
  export let classList = false;

  /**
   * Determines the transition duration based on the `motionless()` function.
   * @returns {Object} - Object with the transition duration.
   */
  function doIt() {
    return {
      duration: motionless() === true ? 0 : duration,
    };
  }

  /**
   * Initiates the fade-out animation.
   * @returns {boolean} - False if motionless, true otherwise.
   */
  function animateOut() {
    if (motionless() === true) return false;
    document.body.classList.toggle('animating-page', true);
  }

  /**
   * Initiates the fade-in animation after a delay.
   * @returns {boolean} - False if motionless, true otherwise.
   */
  function animateIn() {
    if (motionless() === true) return false;
    setTimeout(() => {
      document.body.classList.toggle('animating', false);
      document.body.classList.toggle('animating-page', false);
    }, delay);
  }
</script>

/** * Component rendering the fade container with transition effects. */
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
