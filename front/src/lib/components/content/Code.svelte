<script>
  import { Highlight, LineNumbers, HighlightSvelte } from 'svelte-highlight';
  import javascript from 'svelte-highlight/languages/javascript';
  import bash from 'svelte-highlight/languages/bash';
  import css from 'svelte-highlight/languages/css';
  import json from 'svelte-highlight/languages/json';
  import plaintext from 'svelte-highlight/languages/plaintext';
  import xml from 'svelte-highlight/languages/xml';
  import CodeCopy from './CodeCopy.svelte';
  import '@styles/components/Code/Code.css';

  export let pageTitle, pageSlug, lang, text;
  export let key = false;
  export let title = null;
  export let copyButton = false;
  export let startingLineNumber = 1;
  export let lineNumbers = false;
  export let highlightedLines = false;
  let langLower = lang.toLowerCase();

  let which = {
    shell: bash,
    bash,
    css,
    javascript,
    json,
    hcl: javascript,
    html: xml,
  };

  let language = which[langLower] || plaintext;
</script>

<div
  class={`${
    title === null && copyButton === false
      ? 'headerless '
      : title === null && copyButton === true
        ? 'titleless '
        : ''
  }syntax-highlighter`}
  data-code-instance-id={key}
>
  {#if title !== null}
    <span class="title full" class:copy={copyButton === true}>
      {#if title}{title}{/if}
    </span>
  {/if}
  {#if copyButton === true}
    <CodeCopy {text} {key} {pageTitle} {pageSlug} {title} />
  {/if}
  {#if highlightedLines}
    {#if lineNumbers === true}
      {#if lang === 'Svelte'}
        <HighlightSvelte code={text} {language} let:highlighted>
          <LineNumbers
            {highlighted}
            {startingLineNumber}
            {highlightedLines}
            --highlighted-background="transparent"
            --padding-left="0"
            hideBorder
          />
        </HighlightSvelte>
      {:else}
        <Highlight code={text} {language} let:highlighted>
          <LineNumbers
            {highlighted}
            {startingLineNumber}
            {highlightedLines}
            --highlighted-background="transparent"
            --padding-left="0"
            hideBorder
          />
        </Highlight>
      {/if}
    {:else}
      <Highlight code={text} {language} />
    {/if}
  {:else if lang === 'Svelte'}
    <HighlightSvelte code={text} {language} />
  {:else}
    <Highlight code={text} {language} />
  {/if}
</div>
