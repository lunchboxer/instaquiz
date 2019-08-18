<script>
  import { NotificationList } from './components/notifications'
  import { user } from './data/user'
  import Login from './components/Login.svelte'
  import Navbar from './components/Navbar.svelte'
  import UpcomingSessions from './components/dashboard/UpcomingSessions.svelte'
  import { activeSession, term } from './data/stores'
  import ActiveSession from './components/dashboard/ActiveSession.svelte'
  import Router, { location } from 'svelte-spa-router'
  import routes from './routes'

  term.get()
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

  {#if $activeSession}
    <ActiveSession />
  {:else if $user.username || $location === '/signup'}
    <Router {routes}/>
  {:else}
    <Login/>
  {/if}
        
</main>
  
<NotificationList/>