<script>
  import { PUBLIC_MEDIA_URL } from "$env/static/public";
  import Flourish from "../../../layout/Flourish.svelte";
  import PageTransition from "../../../components/PageTransition.svelte";
  import SvelteMarkdown from "svelte-markdown";
  import Link from "../../../components/markdown/Link.svelte";
  import BlurhashImage from "svelte-blurhash";

  export let data;
  const { pathname } = data;

  const { post } = data;
  const { title } = post;
  const hero = post.hero.data.attributes;
  const heroImage = hero?.formats?.large?.url ? `${PUBLIC_MEDIA_URL}${hero.formats.large.url}` : false;
  const blurhash = hero.blurhash || false;
  const description = post.description || false;
  const content = post.content.length ? post.content : false;
  const seo = post.seo || false;
  const related = post.related.data.length ? post.related.data : post.related.data || false;
  const categories = post.categories.data.length ? post.categories.data : post.categories.data || false;

  // style={heroImage ? `background-image: url('${heroImage}');` : false}

</script>

<PageTransition {pathname}>
  <section class="post-header">
    <Flourish />
    <div class="hero">
      <BlurhashImage
        src={heroImage}
        hash={blurhash}
        width={1100}
        height={400}
      />
    </div>
  </section>
  <section class="post-main">
    <article class="post-content">
      <h1 class="post-title">{title}</h1>
      {#if content.length}
        {#each content as c}
          {#if c.__component === "posts.text"}
            <SvelteMarkdown source={c.text} />
          {/if}
        {/each}
      {/if}
    </article>
    <aside class="post-aside">
      <h2>Categories</h2>
      <h2>Related Posts</h2>
    </aside>
  </section>
</PageTransition>