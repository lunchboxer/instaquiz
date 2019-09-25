<script>
  import { user } from '../../data/user'
  import { terms } from './data'
  import CreateTerm from './CreateTerm.svelte'
  import TermsList from './TermsList.svelte'
  import Loading from '../Loading.svelte'
</script>

<svelte:head>
  <title>Terms</title>
</svelte:head>

<nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li><a href="#/">Home</a></li>
    <li><span aria-current="page">Terms</span></li>
  </ul>
</nav>

<h1>All Terms</h1>

<CreateTerm />

{#if $terms}
  <TermsList terms={$terms}/>
{:else}
  <Loading what="terms and courses" />
{/if}