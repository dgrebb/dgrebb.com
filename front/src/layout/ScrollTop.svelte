<script>
  import IconUp from "~icons/icon-park-outline/up-c";
  import { onMount } from 'svelte'

  let scrollTop;

  onMount(() => {
    scrollTop = (e) => {
      e.preventDefault();
      console.log('scoro');
      document.getElementById("header").scrollIntoView({
        behavior: "smooth"
      });
    }
  });
</script>

<a href="#header" on:click={scrollTop} class="scroll-top">
  <IconUp />
  Back to Top
</a>
