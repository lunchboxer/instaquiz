<script>
  import { NotificationList } from './components/notifications'
  import { user } from './data/user'
  import { terms } from './components/terms/data'
  import Router, { location } from 'svelte-spa-router'
  import routes from './routes'
  import Login from './components/Login.svelte'
  import Navbar from './components/Navbar.svelte'
  import { nowSession } from './components/dashboard/stores'
  import UpcomingSessions from './components/dashboard/UpcomingSessions.svelte'

  terms.get()
  $: console.log($user)
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

  {#if $user.username && !($nowSession && $location === '/')}
    <UpcomingSessions />
  {/if}

  {#if $user.username || $location === '/signup'}
    <Router {routes}/>
  {:else}
    <Login/>
  {/if}
        
</main>
  
<NotificationList/>