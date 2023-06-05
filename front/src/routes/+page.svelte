<script>
    import Image from "../components/Image.svelte";
    import Loading from "../components/Loading.svelte";
    import Links from "../components/Links.svelte";
    import SvelteMarkdown from 'svelte-markdown'
    export let data;
  const { headshot, headline, intro, links } = data;
  const image = headshot?.data?.attributes.formats.thumbnail || false;
</script>

<section class="bio text-center">
  {#if image}
    <Image
      src={image.url}
      alt={image.alternativeText}
      title="Hi!"
      width={120}
      height={120}
      classes="m-auto rounded-full"
    />
  {/if}
  <h1 class="headline">{headline}</h1>
  <SvelteMarkdown source={intro} />
</section>
{#if links.length}
  <section class="links">
    <Links {links} />
  </section>
{/if}
