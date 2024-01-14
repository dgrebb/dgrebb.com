<script>
  import { fade } from 'svelte/transition';
  import { popover } from '@store';
  import '@styles/components/popover.css';
  import { focusTrap } from '@utils/actions';
  import { clickOutside } from '@utils/actions';
  import { onDestroy, onMount } from 'svelte';
  export let show = false;
  export let title = false;
  export let content = false;
  export let ref = null;

  let keydownListener;

  /**
   * Handles hiding the popover.
   * It responds to Escape key, clicks outside, or direct clicks.
   * @param {Event} e - The event that triggers the function.
   */
  function hidePopover(e) {
    const isEsc = e.key === 'Escape' || e.keyCode === 27;
    if (isEsc || e.type === 'click_outside' || e.type === 'click') {
      $popover.show = false;
    }
  }

  // Add and remove the event listener when the component mounts and unmounts
  onMount(() => {
    ref.focus();
    if (!keydownListener) {
      keydownListener = (e) => hidePopover(e);
      document.addEventListener('keydown', keydownListener);
    }
  });

  onDestroy(() => {
    if (keydownListener) {
      document.removeEventListener('keydown', keydownListener);
      keydownListener = null;
    }
  });
</script>

<div
  transition:fade={{ duration: 333 }}
  class="popover"
  class:show
  use:focusTrap={show}
  bind:this={ref}
  tabindex="-1"
>
  <div
    class="popover_slot"
    use:clickOutside
    on:click_outside={(e) => hidePopover(e)}
  >
    <!-- svelte-ignore a11y-unknown-role -->
    <header class="popover_title" class:titleless={!title} role="header">
      {#if title}
        <h1 class="popover_title_heading">{title}</h1>
      {/if}
      <button
        type="button"
        class="popover_close"
        on:click={(e) => hidePopover(e)}
      >
        <span class="icon-cross"></span>
        <span class="sr-only">Close</span>
      </button>
    </header>
    {#if content}
      <!-- svelte-ignore a11y-no-redundant-roles -->
      <main class="popover_content" role="main">
        {@html content}
      </main>
    {/if}
  </div>
</div>
