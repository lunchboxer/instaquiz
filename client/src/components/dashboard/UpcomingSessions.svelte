<script>
  import { user } from '../../data/user'
  import HasSessionIn24Hours from './HasSessionIn24Hours.svelte'
  import { every2Hours, sessions } from './stores'

  const hours = 24

  const now = new Date()
  const latest = new Date(now.getTime() + hours * 3.6e+6)

  sessions.get($user.id, now, latest)
  $: sessions.get(
    $user.id,
    $every2Hours,
    new Date($every2Hours.getTime() + hours * 3.6e+6)
  )
</script>

{#if $sessions && $sessions.length > 0}
  <HasSessionIn24Hours sessions={$sessions} />
{/if}