<script>
  import 'swiped-events'
  import { push } from 'svelte-spa-router'
  export let next
  export let previous

  const goPrevious = () => {
    if (previous) push(previous)
  }
  const goNext = () => {
    if (next) push(next)
  }
</script>

<svelte:window on:swiped-right={goPrevious} on:swiped-left={goNext} />