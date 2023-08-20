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
    console.log(
      '🚀 ~ file: TransitionElasticFly.svelte:12 ~ animateOut ~ nodeOut:',
      nodeOut
    );

    if ($navigating) {
      if ($navigating.from.route.id === $navigating.to.route.id) {
        initialHeight = nodeOut.offsetHeight;
        let animation = nodeOut.closest('.category-posts-list').animate(
          [
            {
              height: initialHeight + 'px',
              overflow: 'hidden',
            },
            {
              height: 80 + 'px',
              overflow: 'hidden',
            },
          ],
          { duration: 4500, fill: 'both', easing: 'ease-out' }
        );
        // animation.play();
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
              overflow: 'hidden',
            },
            {
              height: newHeight + 'px',
              overflow: 'hidden',
            },
          ],
          { duration: 1000, fill: 'both', easing: 'ease-out' }
        );
        // animation.play();
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
