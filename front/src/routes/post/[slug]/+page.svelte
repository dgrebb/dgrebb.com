<script>
  import { MetaTags } from "svelte-meta-tags";
  import Head from "../../../components/Head.svelte";
  export let data;
  const { post } = data;
</script>

<section class="posts text-center">
    <h1>{post.title}</h1>
    <article>{post.body}</article>
</section>

<Head>
  <meta
    name="thumbnail"
    content="https://stg.s.dgrebb.com/img/bio_164dda2bdc.jpg"
  />
</Head>

<MetaTags
  title={post.title}
  titleTemplate="%s | Posts | Dan Grebb"
  description="Dan Grebb is a versatile and accomplished individual with a passion for innovation and creative problem-solving. Dan is an invaluable asset to any organization seeking a dynamic and forward-thinking professional."
  openGraph={{
    images: [
      {
        url: "https://stg.s.dgrebb.com/img/default_banner_8464dc0d50.png",
        width: 1600,
        height: 900,
        alt: "The Circuit of Life",
      },
      {
        url:
          "https://stg.s.dgrebb.com/img/circuit_of_life_800x600_f0b453b8f9.png",
        width: 800,
        height: 600,
        alt: "The Circuit of Life",
      },
    ],
  }}
/>
