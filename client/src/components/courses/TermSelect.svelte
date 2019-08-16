<script>
  import { terms } from '../terms/data'
  import CreateTerm from '../terms/CreateTerm.svelte'

  export let termId = ''
  let termSelect

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
  {#if $terms}
    <select bind:value={termId} on:change={handleChange} bind:this={termSelect}>
        {#if !termId}
          <option>-- Select a term --</option>
        {/if}
      {#each $terms as term (term.id)}
      <option value={term.id} selected={term.id === termId}>{term.name}</option>
      {/each}
    </select>
  {:else}
    <CreateTerm />
  {/if}
</div>