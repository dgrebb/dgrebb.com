<script>
  import { animatedImagePlay } from '@utils/uiHelpers';
  import '@styles/components/animated-image.css';
  export let animation, width, height, aAlt, still, sAlt, figcaption, slug;

  $: playing = false;
  const altText = aAlt ? aAlt : sAlt || 'No alt text. This should be fixed.';
  function playPauseClickHandler(altText, slug) {
    return playing === true ? false : animatedImagePlay(altText, slug);
  }
</script>

<svelte:head>
  <link
    rel="preload"
    href={animation}
    as="image"
    type="image/gif"
    fetchpriority="high"
  />
</svelte:head>
<div class="media-box">
  <figure class="animated-image">
    <div class="animation-player">
      <img
        src={still}
        {width}
        {height}
        alt="Still frame{sAlt === null ? '' : `: ${sAlt}`}"
        loading="lazy"
      />
      <details bind:open={playing}>
        <summary
          aria-label="Click to play the animation"
          on:click={playPauseClickHandler(altText, slug)}
          on:keydown={playPauseClickHandler(altText, slug)}
          role="switch"
          tabindex="0"
          aria-checked={playing}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19.2"
            height="19.2"
            viewBox="0 0 24 24"
            class="play-icon"
          >
            <path
              fill="currentColor"
              d="M19.266 13.516a1.917 1.917 0 0 0 0-3.032A35.762 35.762 0 0 0 9.35 5.068l-.653-.232c-1.248-.443-2.567.401-2.736 1.69a42.49 42.49 0 0 0 0 10.948c.17 1.289 1.488 2.133 2.736 1.69l.653-.232a35.762 35.762 0 0 0 9.916-5.416Z"
            />
          </svg><svg
            xmlns="http://www.w3.org/2000/svg"
            width="19.2"
            height="19.2"
            viewBox="0 0 24 24"
            class="pause-icon"
          >
            <path
              fill="currentColor"
              d="M17.276 5.47c.435.16.724.575.724 1.039V17.49c0 .464-.29.879-.724 1.039a3.69 3.69 0 0 1-2.552 0A1.107 1.107 0 0 1 14 17.491V6.51c0-.464.29-.879.724-1.04a3.69 3.69 0 0 1 2.552 0Zm-8 0c.435.16.724.575.724 1.039V17.49c0 .464-.29.879-.724 1.039a3.69 3.69 0 0 1-2.552 0A1.107 1.107 0 0 1 6 17.491V6.51c0-.464.29-.879.724-1.04a3.69 3.69 0 0 1 2.552 0Z"
            />
          </svg>
        </summary>
        <div class="animation">
          <img
            src={animation}
            {width}
            {height}
            alt={`Animated${aAlt === null ? '' : ' ' + aAlt}`}
            loading="lazy"
          />
        </div>
      </details>
    </div>
    <figcaption>{@html figcaption}</figcaption>
  </figure>
</div>
