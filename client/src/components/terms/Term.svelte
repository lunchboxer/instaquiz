<script>
  import { query } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import { TERM } from '../../data/queries'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import TermDetails from './TermDetails.svelte'

  export let params = {}

  const termCache = query(client, {
    query: TERM,
    variables: { id: params.id }
  })
</script>

<svelte:head>
  <title>Term Details</title>
</svelte:head>

{#await $termCache}
    <Loading what="session"/>
  {:then result}
    {#if result && result.data && result.data.term}
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><a href="#/terms">Terms</a></li>
        </ul>
      </nav>
      <TermDetails term={result.data.term}/>
    {/if}
  {:catch errors}
    <Error {errors} />
  {/await}