<script>
  import { location, pop } from 'svelte-spa-router'
</script>
<style>
  .container {
    height: 100%;
    display: flex;
    justify-content: center;
  }
</style>

<div class="container">
  <section>
    <h1>404</h1>
    <h2>resource not found</h2>
    <p>The path '{$location}' leads nowhere</p>
    <p>It might be wise to return to the <a href="#/">main page</a>.</p>
    <button on:click={() => pop()}>go back</button>
  </section>
</div>