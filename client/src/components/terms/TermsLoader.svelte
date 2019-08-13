<script>
  import { TERMS_AND_ALL } from '../../data/queries'
  import { query, restore } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import TermsList from './TermsList.svelte'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'

  const termsCache = query(client, { query: TERMS_AND_ALL })
</script>

{#await $termsCache}
    <Loading what="terms and courses" />
  {:then result}
    {#if result.data}
    <TermsList terms={result.data.terms}/>
    {/if}
    {:catch errors}
    <Error {errors}/>
  {/await}