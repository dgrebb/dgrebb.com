<script>
  import { Highlight, LineNumbers, HighlightSvelte } from 'svelte-highlight';
  import javascript from 'svelte-highlight/languages/javascript';
  import bash from 'svelte-highlight/languages/bash';
  import css from 'svelte-highlight/languages/css';
  import json from 'svelte-highlight/languages/json';
  import plaintext from 'svelte-highlight/languages/plaintext';
  import xml from 'svelte-highlight/languages/xml';
  import yaml from 'svelte-highlight/languages/yaml';
  import dockerfile from 'svelte-highlight/languages/dockerfile';
  import CodeCopy from './CodeCopy.svelte';
  import '@styles/components/Code/Code.css';

  export let pageTitle, slug, syntax, code, showLineNumbers;

  /**
   * The highlighted lines as a string, which can include single numbers or ranges.
   * If false, indicates that no lines are highlighted.
   */
  export let highlightedLines = false;
  export let key = false;
  export let title = null;
  export let showCopyButton = false;
  export let startingLineNumber = 1;
  export let lineNumbers =
    showLineNumbers === true || highlightedLines.length > 0 || false;
  let langLower = syntax.toLowerCase();

  let which = {
    shell: bash,
    bash,
    css,
    javascript,
    json,
    hcl: javascript,
    html: xml,
    yaml: yaml,
    dockerfile: dockerfile,
  };

  let language = which[langLower] || plaintext;
</script>

<div
  class={`${
    title === null && showCopyButton === false
      ? 'headerless '
      : title === null && showCopyButton === true
        ? 'titleless '
        : ''
  }syntax-highlighter`}
  data-code-instance-id={key}
>
  {#if title !== null || showCopyButton === true}
    <header>
      {#if title !== null}
        <span class="title full" class:copy={showCopyButton === true}>
          {#if title}{title}{/if}
        </span>
      {/if}
      {#if showCopyButton === true}
        <CodeCopy {code} {key} {pageTitle} {slug} {title} />
      {/if}
    </header>
  {/if}
  <div class="syntax-highlighter__screen-wrap">
    {#if highlightedLines}
      {#if lineNumbers === true}
        {#if syntax === 'Svelte'}
          <HighlightSvelte {code} {language} let:highlighted>
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
          <Highlight {code} {language} let:highlighted>
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
        <Highlight {code} {language} />
      {/if}
    {:else if syntax === 'Svelte'}
      <HighlightSvelte {code} {language} />
    {:else}
      <Highlight {code} {language} />
    {/if}
  </div>
</div>
