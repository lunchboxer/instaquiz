<script>
  import { slideshows } from './data'
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'
  import ResizingTextarea from '../ResizingTextarea.svelte'

  export let slideshowId
  export let id = null
  export let order = null
  export let contents = ''
  export let max
  let loading = false
  let errors = ''

  const handleAdd = async () => {
    loading = true
    try {
      await slideshows.addSlide({ slideshowId, order, contents })
      notifications.add({ text: 'Added slide', type: 'success' })
      contents = ''
      errors = ''
    } catch (error) {
      notifications.add({ text: 'Could not save slide', type: 'danger' })
      errors = error
    } finally {
      loading = false
    }
  }
</script>

<style>
  input {
    width: 15rem;
  }
</style>

<section class="slide">

  <Error {errors} />

  <label>Slide number</label>
  <input type="number" min=0 {max} bind:value={order} />

  <label>Contents</label>
  <ResizingTextarea bind:value={contents} {loading} />

  <button on:click={handleAdd}>Add Slide</button>

</section>