<script>
  /**
   * @file SvelteKit Bio Component
   * @module components/Bio
   * @desc This SvelteKit component renders a bio section with an image, headline, and introduction.
   */

  /**
   * @typedef {Object} ImageData
   * @property {string} url - The URL of the image.
   * @property {string} alternativeText - The alternative text for the image.
   */

  /**
   * @typedef {Object} SocialLink
   * @property {string} url - The URL of the social link.
   * @property {string} text - The text or label associated with the social link.
   */

  /**
   * @typedef {Object} PageMeta
   * @property {string} title - The title of the page.
   * @property {string} description - The meta description of the page.
   * @property {string} keywords - The meta keywords of the page.
   */

  /**
   * @typedef {Object} BioData
   * @property {string} headline - The headline or title for the bio section.
   * @property {ImageData} image - The data for the image in the bio section.
   * @property {string} intro - The introduction text for the bio section.
   * @property {Array<SocialLink>} generalContent - The array of social links.
   * @property {PageMeta} pageMeta - The meta information for the page.
   * @property {string} pathname - The pathname of the page.
   */

  /**
   * SvelteKit Bio Component
   * @param {BioData} data - The data used to render the bio section.
   */
  import Image from '@components/general/Image.svelte';
  import Links from '@components/general/Links.svelte';
  import Meta from '@components/general/Meta.svelte';
  import PageTransition from '@components/general/PageTransition.svelte';
  import '@styles/pages/home.css';

  /**
   * @type {BioData}
   */
  export let data;

  const {
    headline,
    image,
    intro,
    generalContent: links,
    pageMeta,
    pathname,
  } = data;
</script>

<PageTransition transitionKey={pathname}>
  <section class="bio">
    <span class="flourish" />

    {#if image}
      <Image
        src={image.url}
        alt={image.alternativeText}
        title="Hi!"
        width={120}
        height={120}
        classes="bio-picture"
        loadingMethod="lazy"
      />
    {/if}

    <noscript>
      <img
        src={image.url}
        alt={image.alternativeText}
        title="Hi!"
        width={120}
        height={120}
        class="bio-picture"
      />
    </noscript>

    <a id="main">Main Content</a>
    <h2 class="headline">{headline}</h2>
    {@html intro}
  </section>

  {#if links.length}
    <section class="links">
      <Links {links} />
    </section>
  {/if}
</PageTransition>

<Meta {pageMeta} />
