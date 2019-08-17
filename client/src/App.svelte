<script>
  import { NotificationList } from './components/notifications'
  import { user } from './data/user'
  import { terms } from './components/terms/data'
  import Router, { location } from 'svelte-spa-router'
  import routes from './routes'
  import Login from './components/Login.svelte'
  import Navbar from './components/Navbar.svelte'
  import { activeSession } from './components/dashboard/stores'
  import ActiveSession from './components/dashboard/ActiveSession.svelte'
  import UpcomingSessions from './components/dashboard/UpcomingSessions.svelte'

  terms.get()
</script>

<style>
  main {
    height: calc(100% - 5rem);
    padding: 1rem;
    margin: 0;
  }
</style>

<Navbar />

<main>

  {#if $user.username}
    <UpcomingSessions />
  {/if}

  {#if $user.role === 'Student' && $activeSession}
    <ActiveSession />
  {:else if $user.username || $location === '/signup'}
    <Router {routes}/>
  {:else}
    <Login/>
  {/if}
        
</main>
  
<NotificationList/>