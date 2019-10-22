<script>
  import { slideshows } from './data'
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'
  import ResizingTextarea from '../ResizingTextarea.svelte'
  import ConfirmDelete from '../ConfirmDelete.svelte'
  import Modal from '../Modal.svelte'

  export let slideshowId
  export let id = null
  export let order = null
  export let contents = ''
  export let max
  let loading = false
  let errors = ''
  let openConfirm = false

  const handleEdit = async () => {
    loading = true
    try {
      await slideshows.editSlide({ slideshowId, id, order, contents })
      notifications.add({ text: 'Saved changes to slide', type: 'success' })
      errors = ''
    } catch (error) {
      notifications.add({ text: 'Could not save slide', type: 'danger' })
      errors = error
    } finally {
      loading = false
    }
  }
  const moveUp = () => {
    order--
    handleEdit()
  }
  const moveDown = () => {
    order++
    handleEdit()
  }

  const remove = async () => {
    try {
      await slideshows.deleteSlide({ slideshowId, id })
      notifications.add({ text: `Removed slide #${order}`, type: 'success' })
      errors = ''
    } catch (error) {
      notifications.add({ text: 'Could not remove slide', type: 'danger' })
      errors = error
    } finally {
      loading = false
    }
  }
</script>

<style>
  .order {
    font-size: 2rem;
    margin-right: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .order span {
    padding: 0;
    margin: 0;
  }

  .arrow {
    fill: white;
    margin: 0;
    padding: 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .slide-info {
    display: flex;
    align-items: center;
  }

  .delete {
    font-size: 2rem;
    font-weight: bold;
  }
</style>

<section class="slide">

  <Error {errors} />

  <div class="slide-info">
    <span class="order">
      {#if order > 0}
      <svg on:click={moveUp} aria-hidden="true" class="arrow" width="36" height="36" viewBox="0 0 36 36">
        <path d="M2 26h32L18 10 2 26z"></path>
      </svg>
      {/if}
      <span>{order}</span>
      {#if order < (max - 1)}
      <svg on:click={moveDown} aria-hidden="true" class="arrow" width="36" height="36" viewBox="0 0 36 36">
        <path d="M2 10h32L18 26 2 10z"></path>
      </svg>
      {/if}
    </span>

    <ResizingTextarea bind:value={contents} on:save={handleEdit} {loading} />
  
    <button class="delete" on:click|preventDefault={ () => { openConfirm = true }}>
      &times;
    </button>
  
    <Modal bind:open={openConfirm}>
      {#if openConfirm}
        <ConfirmDelete name='slide' on:delete={remove} {errors} {loading} bind:open={openConfirm}>
          slide number {order}
        </ConfirmDelete>
      {/if}
    </Modal>

  </div>

</section>