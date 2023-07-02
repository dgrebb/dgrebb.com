<script>
  import Flourish from '../../layout/Flourish.svelte';
  import PageTransition from "../../components/PageTransition.svelte";

  export let data;
  const { title, details, updatedAt, pathname } = data;
</script>

<PageTransition {pathname}>
  <section class="posts">
    <Flourish />
    <h1 class="title">hello world</h1>
      <ul class="posts-list">
        <li><a href="">one</a></li>
        <li><a href="">two</a></li>
        <li><a href="">three</a></li>
        <li><a href="">four</a></li>
        <li><a href="">five</a></li>
        <li><a href="">six</a></li>
        <li><a href="">seven</a></li>
        <li><a href="">eight</a></li>
        <li><a href="">nine</a></li>
      </ul>
  </section>
</PageTransition>
