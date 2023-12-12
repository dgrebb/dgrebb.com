<script>
  /**
   * Svelte component for handling transitions with an elastic fly-out effect.
   * @module TransitionElasticFly
   * @param {string} transitionKey - The key to trigger transitions.
   * @param {boolean} classList - Additional class names for the container.
   * @param {number} duration - Duration of the fly-out transition in milliseconds.
   * @param {number} delay - Delay before the fly-in transition starts in milliseconds.
   */
  import { navigating } from '$app/stores';
  import { circInOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import { motionless, scrollTop } from '@utils';
  export let transitionKey;
  export let classList = false;
  export let duration = 333;
  export let delay = 500;
  let initialHeight;

  /**
   * Handles the animation when an element is being transitioned out.
   * @param {object} node - The DOM node being transitioned.
   */
  function animateOut(node) {
    if (motionless()) return;

    const nodeOut = node.currentTarget;

    if ($navigating && $navigating.from.route.id === $navigating.to.route.id) {
      /**
       * Initial height of the transitioning node.
       * @type {number}
       */
      initialHeight = nodeOut.offsetHeight;
      nodeOut.closest('.category-posts-list').style.height =
        initialHeight + 'px';

      /**
       * Animation for transitioning out.
       * @type {Animation}
       */
      // eslint-disable-next-line no-unused-vars
      let animation = nodeOut.closest('.category-posts-list').animate(
        [
          {
            height: 0 + 'px',
          },
        ],
        { duration, fill: 'both', easing: 'ease-in-out' }
      );
    }
  }

  /**
   * Handles the animation when an element is being transitioned in.
   * @param {object} node - The DOM node being transitioned.
   */
  function animateIn(node) {
    if (motionless()) return;

    const nodeIn = node.target;
    /**
     * New height of the transitioning node.
     * @type {number}
     */
    const newHeight = nodeIn.offsetHeight;

    if ($navigating && $navigating.from.route.id === $navigating.to.route.id) {
      nodeIn.closest('.category-posts-list').style.height = newHeight + 'px';
      /**
       * Animation for transitioning in.
       * @type {Animation}
       */
      // eslint-disable-next-line no-unused-vars
      let animation = nodeIn.closest('.category-posts-list').animate(
        [
          {
            height: initialHeight + 'px',
          },
          {
            height: newHeight + 'px',
          },
        ],
        { duration, fill: 'both', easing: 'ease-in-out' }
      );
      /**
       * Scrolls to the top after transitioning in.
       */
      scrollTop();
    }
  }

  /**
   * Checks if motion is allowed and executes the provided function accordingly.
   * @param {object} node - The DOM node.
   * @param {object} options - Transition options.
   * @returns {any} - The result of the transition function if motion is allowed; otherwise, undefined.
   */
  function motion(node, options) {
    if (motionless() === false) {
      return options.fn(node, options);
    }
  }
</script>

{#key transitionKey}
  <!--
   Container for the elastic fly-out transition.
   @type {HTMLDivElement}
-->
  <div
    class="transition-elastic-fly-container {classList ? classList : ''}"
    on:outrostart={animateOut}
    on:introstart={animateIn}
    out:motion|global={{ fn: fly, x: -1000, duration, easing: circInOut }}
    in:motion|global={{ fn: fly, x: -1000, duration, delay, easing: circInOut }}
  >
    <slot />
  </div>
{/key}
