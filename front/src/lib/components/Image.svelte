<script>
  import Loading from './Loading.svelte';

  export let src;
  export let alt;
  export let title;
  export let width = null;
  export let height = null;
  export let classes = null;
  export let ariaHidden = 'false';

  const preload = async (src) => {
    const resp = await fetch(src);
    const blob = await resp.blob();

    return new Promise(function (resolve) {
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject('Error: ', error);
    });
  };
</script>

{#await preload(src)}
  <div class="image-loader" style={`height: ${height}px; width: ${width}px`}>
    <Loading />
  </div>
{:then base64}
  <img
    src={base64}
    {alt}
    {title}
    {width}
    {height}
    class={classes}
    aria-hidden={ariaHidden}
  />
{/await}