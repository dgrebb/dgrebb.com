<script>
  import { navigating } from '$app/stores';
  import { circInOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import { motionless } from '@utils';
  export let transitionKey;
  export let classList = false;
  export let duration = 333;
  export let delay = 500;
  let initialHeight;

  function animateOut(node) {
    if (motionless() === true) return false;
    const nodeOut = node.currentTarget;

    if ($navigating) {
      if ($navigating.from.route.id === $navigating.to.route.id) {
        initialHeight = nodeOut.offsetHeight;
        let animation = nodeOut.closest('.category-posts-list').animate(
          [
            {
              height: initialHeight + 'px',
            },
            {
              height: 0 + 'px',
            },
          ],
          { duration, fill: 'both', easing: 'ease-in-out' }
        );
      }
    }
  }

  function animateIn(node) {
    if (motionless() === true) return false;
    const nodeIn = node.target;
    const newHeight = nodeIn.offsetHeight;

    if ($navigating) {
      if ($navigating.from.route.id === $navigating.to.route.id) {
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
      }
    }
  }

  /**
   * Along with `motionless()`, this function assists with built-in Svelte transitions
   * @param node
   * @param options
   */
  function motion(node, options) {
    if (motionless() === false) {
      return options.fn(node, options);
    }
  }
</script>

{#key transitionKey}
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
