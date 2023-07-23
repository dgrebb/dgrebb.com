<script>
  import { onMount } from "svelte";
  import Code from "@components/content/Code.svelte";
  import Footnotes from "@components/content/renderers/Footnotes.svelte";
  import Link from "@components/content/renderers/Link.svelte";
  import PostHeading from "@components/content/renderers/PostHeading.svelte";
  import PostNav from "@components/posts/PostNav.svelte";
  import slugger from "slugger";
  import SvelteMarkdown from "svelte-markdown";

  export let title;
  export let summary;
  export let content;
  export let footnotes;
  export let categories;
  export let related;
  export let pathname;

  let toc, postNavCheckbox, miniPostNav;
  $: if (content) toc = [];
  function filterTokens(event) {
    const tokens = event.detail.tokens;
    const headings = tokens.filter((t) => t.type === "heading");
    toc = [
      ...toc,
      ...headings.map((h) => ({
        text: h.text,
        link: `#${slugger(h.text)}`,
      })),
    ];
  }

  function handleParsed(event) {
    filterTokens(event);
  }

  $: contents = toc ? [...toc] : false;

  $: showAside = true;
  $: asideLabel = showAside ? "Hide" : "Show";
  function asideToggle() {
    showAside = !showAside;
  }

  function togglePostNav(e) {
    postNavCheckbox.checked = postNavCheckbox.checked ? false : true;
  }

  onMount(() => {
    postNavCheckbox = document.getElementById("post-navigation-checkbox");
    miniPostNav = document.querySelector(".post-navigation.mini");
    setTimeout(() => {
      document
        .querySelectorAll(".post-navigation.mini .toc li")
        .forEach((link) => {
          link.addEventListener("click", (e) => {
            togglePostNav(e);
          });
        });
    }, 200);
    document.body.addEventListener("click", (e) => {
      if (
        e.target.tagName.toLowerCase() === "a" &&
        e.target.className.indexOf("transition-link") > -1
      ) {
        return;
      } else {
        if (postNavCheckbox?.checked) postNavCheckbox.checked = false;
        return;
      }
    });
    miniPostNav?.addEventListener("click", (e) => {
      if (
        e.target.tagName.toLowerCase() === "a" &&
        e.target.className.indexOf("transition-link") > -1
      ) {
        return;
      } else {
        e.stopImmediatePropagation();
      }
    });
  });
</script>

{#if toc || categories.length || related.length}
  <PostNav {contents} {categories} {related} {pathname} mini={true} />
{/if}
<h1 class="post-title">{title}</h1>
<article class="post-article" class:full={!showAside}>
  {#if summary}
    <p class="summary">{summary}</p>
  {/if}
  {#if content}
    {#each content as c}
      {#if c.__component === "posts.text"}
        <SvelteMarkdown
          source={c.text}
          renderers={{ link: Link, heading: PostHeading }}
          on:parsed={handleParsed}
        />
      {/if}
      {#if c.__component === "posts.code"}
        {@const lines =
          c?.highlightedLines?.split(",").map((item) => Number(item - 1)) ||
          false}
        <Code
          text={c.code}
          lang={c.language}
          title={c?.title}
          highlightedLines={lines
            ? lines.sort((a, b) => {
                return a - b;
              })
            : false}
        />
      {/if}
      {#if c.__component === "posts.html"}
        <div class="inline-html">
          {@html c.html}
        </div>
      {/if}
    {/each}
  {/if}
  {#if footnotes}
    <footer class="footnotes-footer">
      <Footnotes {footnotes} />
    </footer>
  {/if}
</article>

<!-- <button on:click={asideToggle} class="aside-toggle"
  >{asideLabel} Sidebar</button
> -->
<aside class="post-aside" class:show={showAside}>
  <PostNav {contents} {categories} {related} {pathname} />
</aside>
