<script>
  import { terms } from './data'
  import Loading from '../Loading.svelte'
  import TermDetails from './TermDetails.svelte'

  export let params = {}

  $: terms.get(params.id)
  $: thisTerm = $terms && $terms.find(t => t.id === params.id)
</script>

<svelte:head>
  <title>Term Details</title>
</svelte:head>

{#if thisTerm}
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><a href="#/terms">Terms</a></li>
    </ul>
  </nav>
  <TermDetails term={thisTerm}/>
{:else}
  <Loading what="term"/>
{/if}