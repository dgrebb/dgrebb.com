<script context="module">
  export const prerender = true;
</script>

<script>
    import "../styles/global.css";
    import Footer from "../components/Footer.svelte";
    import Header from "../components/Header.svelte";

    export let data;
    const { navHeading, navItems, copyright, copyleft } = data;
</script>

<Header {navHeading} {navItems} />
<main id="main" class="main flex flex-col items-center">
  <slot />
</main>
<Footer {copyleft} {copyright} />
