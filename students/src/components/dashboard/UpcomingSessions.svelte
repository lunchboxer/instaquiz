<script>
  import { user } from '../../data/user'
  import HasSessionIn24Hours from './HasSessionIn24Hours.svelte'
  import { every2Hours, sessions } from '../../data/stores'

  const hours = 24

  $: sessions.get(
    $user.id,
    $every2Hours,
    new Date($every2Hours.getTime() + hours * 3.6e+6)
  )
</script>

{#if $sessions && $sessions.length > 0}
  <HasSessionIn24Hours sessions={$sessions} />
{/if}