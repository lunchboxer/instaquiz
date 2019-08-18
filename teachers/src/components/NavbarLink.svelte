<script>
  export let url = ''
  export let text = ''
  export let icon = null
</script>

<style>
  i {
    margin-right: 0.3rem;
    width: 20px;
    text-align: center;
  }

  @media only screen and (max-width: 1024px) {
    :global(a.active) {
      border-radius: 4px;
      color: #cb2d6f;
      font-weight: bold;
      background-color: inherit;
    }
  }

  .navbar-item {
    line-height: 1.5;
    padding: 1rem;
    position: relative;
    align-items: center;
    display: flex;
    font-weight: 400;
  }
</style>

<a class="navbar-item" href="{url}">
  {text}
</a>