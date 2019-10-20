<script>
  import { createEventDispatcher } from 'svelte'

  export let value = ''
  let textarea
  let alreadySet = false
  export let loading = false

  const dispatch = createEventDispatcher()

  const inputHandler = event => {
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  }

  // adjust the height when component loads
  $: if (!alreadySet && textarea) {
    inputHandler()
    alreadySet = true
  }

  const save = () => {
    dispatch('save', { value })
  }
</script>

<style>
  textarea {
    resize: none;
    overflow: hidden;
    min-height: 1rem;
    margin: 0.5rem 0;
  }
</style>

<textarea id="contentsField" on:change={save} bind:value bind:this={textarea} on:input={inputHandler}
  disabled={loading}></textarea>