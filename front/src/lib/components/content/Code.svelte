<script>
  import Highlight, { LineNumbers } from 'svelte-highlight';
  import plaintext from 'svelte-highlight/languages/plaintext';
  import JavaScript from 'svelte-highlight/languages/javascript';
  import XML from 'svelte-highlight/languages/xml';
  import CSS from 'svelte-highlight/languages/css';
  import CodeCopy from './CodeCopy.svelte';

  export let key;
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
    {#if title}
      <span class="title" class:full={!lang}>{title}</span>
    {/if}
    {#if lang}
      <span
        class="language"
        class:full={!title}
        class:copy={copyButton === true}>{lang}</span
      >
    {/if}
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
    {#if title}
      <span class="title" class:full={!lang} class:copy={copyButton === true}
        >{title}</span
      >
    {/if}
    {#if lang}
      <span
        class="language"
        class:full={!title}
        class:copy={copyButton === true}>{lang}</span
      >
    {/if}
    {#if copyButton === true}<CodeCopy {text} {key} />{/if}
    <Highlight code={text} {language} />
  {/if}
</div>
