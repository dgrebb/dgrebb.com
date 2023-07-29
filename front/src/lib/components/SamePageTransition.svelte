<script>
  import { navigating } from "$app/stores";

  export let transitionKey;
  export let classList = false;
  export let animateHeight = false;

  function doIt() {
    return {
      duration: 500,
    };
  }

  function animateOut(node) {
    document.body.classList.toggle("animating-page", true);

    if ($navigating) {
      if ($navigating.from.route.id === $navigating.to.route.id) {
        if (animateHeight) {
          const initialHeight = node.currentTarget.offsetHeight;
          const nodeOut = node.currentTarget;
          let animation = nodeOut.animate(
            [
              {
                height: initialHeight + "px",
                overflow: "hidden",
              },
              {
                height: 0 + "px",
                overflow: "hidden",
              },
            ],
            { duration: 500, fill: "both", easing: "ease-out" }
          );
          animation.play();
        }
      }
    }
  }

  function animateIn(node) {
    if (animateHeight) {
      const initialHeight = node.target.firstElementChild.offsetHeight;
      const nodeIn = node.target;
      let animation = nodeIn.animate(
        [
          {
            height: 0 + "px",
            overflow: "hidden",
          },
          {
            height: initialHeight + "px",
            overflow: "hidden",
          },
        ],
        { duration: 800, fill: "both" }
      );
      animation.play();
    }
    setTimeout(() => {
      document.body.classList.toggle("animating", false);
      document.body.classList.toggle("animating-page", false);
    }, 600);
  }
</script>

{#key transitionKey}
  <div
    class="page-transition-container {classList ? classList : ''}"
    transition:doIt|global
    on:outrostart={animateOut}
    on:introstart={animateIn}
  >
    <slot />
  </div>
{/key}
