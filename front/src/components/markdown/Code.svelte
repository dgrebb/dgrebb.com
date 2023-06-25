<script>
  import Highlight, { LineNumbers } from "svelte-highlight";
  import JavaScript from "svelte-highlight/languages/javascript";

  export let lang;
  export let text;
  export let title = null;
  let language = lang.toLowerCase();

  let which = {
    "javascript": JavaScript,
    "hcl": JavaScript
  }

</script>

<div class="syntax-highlighter">
  <span class="title">{title ? title : lang}</span>
  <Highlight code={text} language={which[language]} />
</div>
