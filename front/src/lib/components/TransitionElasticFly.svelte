<script>
  import { navigating } from '$app/stores';
  import { circInOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  export let transitionKey;
  export let classList = false;
  export let duration = 333;
  export let delay = 500;
  let initialHeight;

  function animateOut(node) {
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
</script>

{#key transitionKey}
  <div
    class="transition-elastic-fly-container {classList ? classList : ''}"
    on:outrostart={animateOut}
    on:introstart={animateIn}
    out:fly|global={{ x: -1000, duration, easing: circInOut }}
    in:fly|global={{ x: -1000, duration, delay, easing: circInOut }}
  >
    <slot />
  </div>
{/key}
