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
    <li class="is-active"><a href="#/terms" aria-current="page">Terms</a></li>
  </ul>
</nav>

<h1 class="title is-3">All Terms</h1>

{#if $user.role === 'Teacher'}
  <CreateTerm />
{/if}

{#if $terms}
  <TermsList terms={$terms}/>
{:else}
  <Loading what="terms and courses" />
{/if}