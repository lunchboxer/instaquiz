<script>
  import { session } from './data'
  import Loading from '../Loading.svelte'
  import SessionDetails from './SessionDetails.svelte'

  export let params = {}

  session.get(params.id)
</script>

<svelte:head>
  <title>Session Details</title>
</svelte:head>

{#if $session}
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><a href="#/">{$session.course.term.name}</a></li>
      <li><a href="#/course/{$session.course.id}">
        {$session.course.name}
      </a></li>
    </ul>
  </nav>
  <SessionDetails session={$session} />
{:else}
  <Loading what="session"/>
{/if}