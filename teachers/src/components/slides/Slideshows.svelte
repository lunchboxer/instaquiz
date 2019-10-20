<script>
  import { onMount } from 'svelte'
  import { slideshows } from './data'
  import Error from '../Error.svelte'
  import Loading from '../Loading.svelte'
  import CreateSlideshow from './CreateSlideshow.svelte'

  let errors = ''
  let loading = false

  onMount(async () => {
    loading = true
    try {
      await slideshows.get()
    } catch (error) {
      errors = error
    } finally {
      loading = false
    }
  })
</script>

<h1>Slide shows</h1>

<Error {errors} />

<CreateSlideshow />

{#if loading}
  <Loading what="slideshows"/>
{:else}
  <section>
    {#if $slideshows && $slideshows.length > 0}
      {#each $slideshows as slideshow}
        <li><a href="#/slideshow/{slideshow.id}">{slideshow.name}</a></li>
      {/each}
    {:else}
      <p>No slide shows were found.</p>
    {/if}
  </section>
{/if}