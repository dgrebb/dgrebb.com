<script>
  import { Highlight, LineNumbers, HighlightSvelte } from 'svelte-highlight';
  import {
    bash,
    css,
    javascript,
    json,
    plaintext,
    xml,
  } from 'svelte-highlight/languages';
  // import  from 'svelte-highlight/languages/javascript';
  // import  from 'svelte-highlight/languages/xml';
  // import  from 'svelte-highlight/languages/css';
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

<div class="syntax-highlighter" data-code-instance-id={key}>
  <span class="title full" class:copy={copyButton === true}>
    {#if title}{title}{:else}Example:{/if}
  </span>
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
