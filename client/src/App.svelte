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