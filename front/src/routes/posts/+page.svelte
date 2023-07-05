<script>
  import { PUBLIC_MEDIA_URL } from "$env/static/public";
  import Flourish from '../../layout/Flourish.svelte';
  import PageTransition from "../../components/PageTransition.svelte";
  import SvelteMarkdown from 'svelte-markdown';
  import Link from '../../components/markdown/Link.svelte';

  export let data;
  const { pathname } = data;
  const { headline, description, seo } = data.content;
  const posts = [];
  data.posts.map(post => {
    const content = post.attributes;
    const { title, slug, seo } = content;
    const hero = post.attributes.hero?.data;
    let image, blurhash = false;

    if (hero) {
      image = `${PUBLIC_MEDIA_URL}${hero.attributes.formats.medium.url}`;
      blurhash = hero.attributes?.blurhash;
    }
    
    console.log("🚀 ~ file: +page.svelte:19 ~ image:", image)
    posts.push({
      title,
      slug,
      seo,
      image,
      blurhash
    });
  });

</script>

<PageTransition {pathname}>
  <section class="posts">
    <Flourish />
    <h1 class="title">{headline}</h1>
    <SvelteMarkdown renderers={{ link: Link }} source={description} />
    <ul class="posts-grid">
      {#each posts as post}
        <li
          class="post-item"
          style={`background-image: url('${post.image ? post.image : null}')`}
        >
          <a href={`/posts/${post.slug}`} class="post-link">
            {post.title}
          </a>
        </li>
      {/each}
    </ul>
  </section>
</PageTransition>
