<script>
  import { navigating } from "$app/stores";

  export let transitionKey;
  export let classList = false;
  export let animateHeight = false;

  function doIt() {
    return {
      duration: 333,
    };
  }

  let routeChange = false;
  $: if ($navigating) {
  console.log("from:", $navigating.from.route.id);
  console.log("to:", $navigating.to.route.id);
    if ($navigating.from.route.id !== $navigating.from.route.id) {
      routeChange = true;
    }
  }
  
  function animateOut(node) {

    if ($navigating) {
      if ($navigating.from.route.id === $navigating.to.route.id) {
          console.log("in-page animating out");
        
        document.body.classList.toggle("animating-page", true);
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
                height: "180px",
                overflow: "hidden",
              },
            ],
            { duration: 500, fill: "both" }
          );
          // animation.pause();
          animation.play();
        }
      }
    }



    // if ($navigating.from.route.id !== $navigating.from.route.id) {
    //   return false;
    // }
    // console.log("in-page animating out");
    // document.body.classList.toggle("animating-page", true);
    // if (animateHeight) {
    //   const initialHeight = node.currentTarget.offsetHeight;
    //   const nodeOut = node.currentTarget;
    //   let animation = nodeOut.animate(
    //     [
    //       {
    //         height: initialHeight + "px",
    //         overflow: "hidden",
    //       },
    //       {
    //         height: "180px",
    //         overflow: "hidden",
    //       },
    //     ],
    //     { duration: 500, fill: "both" }
    //   );
    //   // animation.pause();
    //   animation.play();
    // }
  }

  function animateIn(node) {
    console.log("in-page animating in");
    setTimeout(() => {
      document.body.classList.toggle("animating", false);
      document.body.classList.toggle("animating-page", false);
    }, 700);
    if (animateHeight) {
      const initialHeight = node.target.querySelector("ul").offsetHeight;
      const nodeIn = node.target;
      let animation = nodeIn.animate(
        [
          {
            height: 0,
            overflow: "hidden",
          },
          {
            height: initialHeight + "px",
            overflow: "hidden",
          },
        ],
        { duration: 500, fill: "both" }
      );
      // animation.pause();
      animation.play();
    }
  }
</script>

{#key transitionKey}
  <div
    class="page-transition-container {classList ? classList : ''}"
    transition:doIt
    on:outrostart={animateOut}
    on:introstart={animateIn}
  >
    <slot />
  </div>
{/key}
