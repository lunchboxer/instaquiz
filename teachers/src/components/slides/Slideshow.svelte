<script>
  import { slideshows } from './data'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import EditSlide from './EditSlide.svelte'
  import AddSlide from './AddSlide.svelte'
  import { flip } from 'svelte/animate'

  export let params = {}
  let loading = false
  let errors = ''
  let slideshow

  const load = async id => {
    loading = true
    try {
      await slideshows.get(id)
      errors = ''
    } catch (error) {
      errors = error
    } finally {
      loading = false
    }
  }

  $: if (params.id) load(params.id)
  $: slideshow = params && $slideshows && $slideshows.find(s => s.id === params.id)
</script>

<style>
  li {
    list-style-type: none;
  }
</style>

<Error {errors} />

{#if loading}
  <Loading what="slide show"/>
{:else}
  {#if slideshow}
    <h1>{slideshow.name}</h1>

    {#if slideshow.slides && slideshow.slides.length > 0}
      {#each slideshow.slides as slide (slide.id)}
        <li animate:flip="{{ duration: 500 }}">
          <EditSlide id={slide.id} slideshowId={slideshow.id} max={slideshow.slides.length} order={slide.order} contents={slide.contents} /> 
        </li>
      {/each}
    {:else}
      <p>No slides currently.</p>
    {/if}

    <h3>New slide</h3>
    <AddSlide slideshowId={slideshow.id} max={slideshow.slides.length} order={slideshow.slides.length} />
  {/if}
{/if}