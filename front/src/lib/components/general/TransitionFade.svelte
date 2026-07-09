<script>
  /**
   * @script
   * This script controls a transition effect for a fade container in a SvelteKit application.
   * @module FadeTransition
   */

  import { motionless } from '@utils';

  /**
   * Props for the component.
   */
  let { transitionKey, duration = 333, delay = 600, classList = false, children } = $props();

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
    onoutrostart={animateOut}
    onintrostart={animateIn}
  >
    {@render children?.()}
  </div>
{/key}
