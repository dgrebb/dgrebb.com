<script>
  import { PUBLIC_MEDIA_URL } from "$env/static/public";
  import Flourish from '../../layout/Flourish.svelte';
  import PageTransition from "../../components/PageTransition.svelte";
  import SvelteMarkdown from 'svelte-markdown';
  import Link from '../../components/markdown/Link.svelte';

  export let data;
  const { pathname } = data;
  let image, blurhash, seo = false;
  const { headline, description } = data.postsPageContent;
  seo = data?.postsPageContent?.seo;
  const posts = [];

  data.posts.map(post => {
    const pageContent = post.attributes;
    const { title, slug, seo } = pageContent;
    const thumbnail = pageContent.hero?.data || false;

    if (thumbnail) {
      image = `${PUBLIC_MEDIA_URL}${thumbnail.attributes.formats.medium.url}`;
      blurhash = thumbnail.attributes?.blurhash;
    }
    
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
    <div class="summary">
      <SvelteMarkdown renderers={{ link: Link }} source={description} />
    </div>
    <ul class="posts-grid">
      {#each posts as post}
        <li
          class="post-item"
          style={`background-image: url('${post.image ? post.image : null}')`}
        >
          <a href={`/post/${post.slug}`} class="post-link">
            {post.title}
          </a>
        </li>
      {/each}
    </ul>
  </section>
</PageTransition>
