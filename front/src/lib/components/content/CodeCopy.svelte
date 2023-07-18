<script>
  import { onMount } from "svelte";
  import IconCopy from "~icons/mdi/clipboard-multiple-outline";
  import IconCopied from "~icons/line-md/confirm-circle";

  export let text;
  $: copied = false;
  $: icon = (copied) => (copied ? `<IconCopy />` : `<IconCopy />`);

  const handleCopy = async (e) => {
    await navigator.clipboard.writeText(text);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 1000);
  };
</script>

<button class="code-copy-btn" on:click={handleCopy} on:keydown={handleCopy}>
  {#if copied}<IconCopied />{:else}<IconCopy />{/if}
</button>
