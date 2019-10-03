<script>
  import { NotificationList } from './components/notifications'
  import { user } from './data/user'
  import { terms } from './components/terms/data'
  import Router, { location } from 'svelte-spa-router'
  import routes from './routes'
  import Login from './components/Login.svelte'
  import Navbar from './components/Navbar.svelte'
  import UpcomingSessions from './components/dashboard/UpcomingSessions.svelte'

  terms.get()
</script>

<style>
  main {
    padding: 1rem;
  }

  @media only screen and (min-width: 768px) {
    main {
      padding: 2rem;
    }
  }
</style>

<Navbar />

<main>
  {#if $user.username && $user.role === 'Teacher'}
    <UpcomingSessions />
  {/if}

  {#if $user.username || $location === '/signup'}
    {#if $user.role !== 'Teacher'}
      <h1>Access denied</h1>
      <p>Only teachers may enter here.</p>
      <a href="/students">&leftarrow; Back to students page</a>
    {:else}
      <Router {routes}/>
    {/if}
  {:else}
    <Login/>
  {/if}
        
</main>
  
{#if $location !== '/viewer'}
  <NotificationList/>
{/if}