<script>
  import Highlight, { LineNumbers } from "svelte-highlight";
  import plaintext from "svelte-highlight/languages/plaintext";
  import JavaScript from "svelte-highlight/languages/javascript";

  export let lang;
  export let text;
  export let title = null;
  export let highlightedLines = false;
  let langLower = lang.toLowerCase();

  let which = {
    javascript: JavaScript,
    hcl: JavaScript,
  };

  let language = which[langLower] || plaintext;
</script>

{#if highlightedLines}
  <div class="syntax-highlighter">
    <span class="title">{title ? title : lang}</span>
    <Highlight code={text} {language} let:highlighted>
      <LineNumbers
        {highlighted}
        {highlightedLines}
        --highlighted-background="#fefefe"
        hideBorder
      />
    </Highlight>
  </div>
{:else}
  <div class="syntax-highlighter">
    <span class="title">{title ? title : lang}</span>
    <Highlight code={text} {language} />
  </div>
{/if}
