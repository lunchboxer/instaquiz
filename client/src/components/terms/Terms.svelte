<script>
  import TermsLoader from './TermsLoader.svelte'
  import { auth } from '../../data/auth'
  import CreateTerm from './CreateTerm.svelte'
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

{#if $auth.role === 'Teacher'}
  <CreateTerm />
{/if}

<TermsLoader />