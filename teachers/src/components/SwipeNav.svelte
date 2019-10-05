<script>
  import 'swiped-events'
  import { push } from 'svelte-spa-router'
  export let next
  export let previous

  const goPrevious = () => {
    console.log('going to previous', previous)
    if (previous) push(previous)
  }
  const goNext = () => {
    console.log('going to next', next)
    if (next) push(next)
  }
</script>

<svelte:window on:swiped-right={goPrevious} on:swiped-left={goNext} />