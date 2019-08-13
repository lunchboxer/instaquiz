<script>
  import { query } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import { TERMS } from '../../data/queries'

  export let termId = ''
  let termSelect

  const terms = query(client, { query: TERMS })

  const handleChange = () => {
    termId = termSelect.value
  }
</script>

<style>
  .select {
    margin-bottom: 1rem;
  }
</style>

<div class="select">

  <select bind:value={termId} on:change={handleChange} bind:this={termSelect}>
    {#await $terms}
      <option>Loading...</option>
    {:then result}
      {#if !termId}
      <option>-- Select a term --</option>
      {/if}
      {#each result.data.terms as term (term.id)}
      <option value={term.id} selected={term.id === termId}>{term.name}</option>
      {/each}
    {:catch}
      <option />
    {/await}
  </select>
</div>