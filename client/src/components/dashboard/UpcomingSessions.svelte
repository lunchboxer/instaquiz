<script>
  import { query } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import { GET_MY_SESSIONS } from '../../data/queries'
  import { auth } from '../../data/auth'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import HasSessionIn24Hours from './HasSessionIn24Hours.svelte'
  import { every2Hours } from './stores'

  const hours = 24

  const now = new Date()
  const latest = new Date(now.getTime() + hours * 3.6e+6)

  const sessions = query(client, {
    query: GET_MY_SESSIONS,
    variables: { id: $auth.id, now, latest }
  })
  // refetch the data from the server every 2 hours
  $: sessions.refetch({ id: $auth.id, now: $every2Hours, latest: new Date($every2Hours.getTime() + hours * 3.6e+6) })
</script>

{#await $sessions}
  <Loading what="Your upcoming sessions"/>
{:then result}
  {#if result.data.sessions.length > 0}
    <HasSessionIn24Hours sessions={result.data.sessions} />
  {/if}
{:catch errors}
  <Error {errors}/>
{/await}