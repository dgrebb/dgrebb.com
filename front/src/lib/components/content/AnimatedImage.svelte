<script>
  export let animation, aAlt, still, sAlt, figcaption;
</script>

<div class="media-box">
  <figure>
    <div class="gif-player">
      <img
        src={still}
        alt="Still frame{sAlt === null ? false : `: ${sAlt}`}"
        loading="lazy"
      />
      <details>
        <summary aria-label="static image"></summary>
        <div class="gif-player-animation">
          <img
            src={animation}
            alt="Animated{aAlt === null ? false : `: ${aAlt}`}"
            loading="lazy"
          />
        </div>
      </details>
    </div>
    <figcaption>{figcaption}</figcaption>
  </figure>
</div>

<style>
  .media-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
  }

  .gif-player {
    display: inline-block;
    position: relative;
  }

  summary {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 2;
    border-radius: 50%;
    background: #000;
    background-image: url('https://assets.codepen.io/128034/play_circle_filled-24px.svg');
    background-position: center;
    background-size: 90% auto;
    background-repeat: no-repeat;
    background-color: white;
    width: 2rem;
    height: 2rem;
    color: #fff;
  }

  [open] summary {
    box-shadow: 0 0 0 2px #fff;
    background-image: url('https://assets.codepen.io/128034/pause_circle_filled-24px.svg');
    background-color: white;
  }

  /* for blink/webkit */
  details summary::-webkit-details-marker {
    display: none;
  }
  /* for firefox */
  details > summary:first-of-type {
    list-style: none;
  }

  summary + * {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #000;
    color: #fff;
  }

  summary:focus {
    outline: transparent;
    box-shadow: 0 0 0 0.25rem #aade87;
  }

  .gif-player-animation {
    padding-top: 0;
  }

  .gif-player-animation img {
    display: inline-block;
    position: absolute;
    top: 0px;
    left: 0px;
    overflow: visible;
  }
</style>
