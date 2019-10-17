<script>
  import { location } from 'svelte-spa-router'
  export let url = ''
  export let text = ''
  export let icon = null
</script>

<style>
   :global(a.active) {
      color: white;
      font-weight: bold;
      background-color: inherit;
    }
  @media only screen and (max-width: 1024px) {
   
    .navbar-item {
      padding: .5rem;
    }
  }

  .navbar-item {
    line-height: 1.5;
    padding: 0.5rem 1rem 0.5rem 1rem;
    position: relative;
    align-items: center;
    display: flex;
    font-weight: 400;
  }

  li {
    list-style-type: none;
  }
</style>

<li>
  <a class="navbar-item" href="#{url}" class:active={url === $location}>
    {text}
  </a>
</li>