<script>
  import Highlight, { LineNumbers } from 'svelte-highlight';
  import plaintext from 'svelte-highlight/languages/plaintext';
  import JavaScript from 'svelte-highlight/languages/javascript';
  import XML from 'svelte-highlight/languages/xml';
  import CSS from 'svelte-highlight/languages/css';
  import CodeCopy from './CodeCopy.svelte';

  export let key = false;
  export let lang;
  export let text;
  export let title = null;
  export let copyButton = false;
  export let lineNumbers = false;
  export let highlightedLines = false;
  let langLower = lang.toLowerCase();

  let which = {
    javascript: JavaScript,
    html: XML,
    css: CSS,
    hcl: JavaScript,
  };

  let language = which[langLower] || plaintext;
</script>

<div class="syntax-highlighter">
  {#if highlightedLines}
    <span class="title full">
      {#if title}{title}{:else}Example:{/if}
    </span>
    <!-- {#if lang}
      <span
        class="language"
        class:full={!title}
        class:copy={copyButton === true}>{lang}</span
      >
    {/if} -->
    {#if copyButton === true}<CodeCopy {text} {key} />{/if}
    {#if lineNumbers === true}
      <Highlight code={text} {language} let:highlighted>
        <LineNumbers
          {highlighted}
          {highlightedLines}
          --highlighted-background="transparent"
          --padding-left="0"
          hideBorder
        />
      </Highlight>
    {:else}
      <Highlight code={text} {language} />
    {/if}
  {:else}
    <span class="title full" class:copy={copyButton === true}>
      {#if title}{title}{:else}Example:{/if}
    </span>
    <!-- {#if lang}
      <span
        class="language"
        class:full={!title}
        class:copy={copyButton === true}>{lang}</span
      >
    {/if} -->
    {#if copyButton === true}<CodeCopy {text} {key} />{/if}
    <Highlight code={text} {language} />
  {/if}
</div>
