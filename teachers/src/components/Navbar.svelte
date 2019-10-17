<script>
  import { user } from '../data/user'
  import NavbarLink from './NavbarLink.svelte'
  import { notifications } from './notifications'
  import { location } from 'svelte-spa-router'

  let showMenu = false
  let menu

  const logout = async () => {
    const username = await user.logout()
    notifications.add({ text: `Logged out user '${username}'`, type: 'success' })
  }

  const toggleMenu = () => {
    showMenu = !showMenu
    menu.hidden = !menu.hidden
  }
</script>

<style>
  .logo {
    margin-right: 0.8rem;
  }

  .navbar-brand {
    align-items: stretch;
    display: flex;
    flex-shrink: 0;
    min-height: 3rem;
  }

  .navbar {
    background: transparent;
    margin: 0;
    color: white;
    height: 5rem;
    position: relative;
    z-index: 30;
    width: 100%;
    display: flex;
    align-items: stretch;
    padding: 0.5rem;
    justify-content: space-between;
  }

  .navbar-item {
    padding: 1rem;
    position: relative;
    color: #fff;
    align-items: center;
    display: flex;
  }

  .title {
    font-size: 2.5rem;
    color: white;
    font-weight: 600;
  }

  [hidden] {
    display: none;
  }

  @media only screen and (min-width: 1024px) {
    .menu-toggle {
      display: none;
    }

    #navbar-menu {
      display: flex;
    }
  }

  @media only screen and (max-width: 1024px) {
    .menu-toggle {
      display: block;
      position: absolute;
      top: 10px;
      right: 10px;
      border: 0;
      z-index: 40;
      outline: none;
    }

    .menu-toggle:focus {
      outline: 0;
    }

    #navbar-menu {
      padding: 4rem 1rem 2rem 1rem;
      position: fixed;
      right: -20rem;
      width: 20rem;
      list-style: none;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      top: 0;
      bottom: 0;
      transition: 200ms ease-in-out;
      height: 100%;
      background: black;
    }
  }

  #navbar-menu.is-active {
    transform: translate(-20rem);
  }
</style>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="#/">
      <img class="logo" src="kumu-logo.png" height="28" alt="levitation logo" />
      <span class="title">InstaQuiz</span>
    </a>
  </div>

  {#if $user.id}
    <button class:is-active={showMenu} on:click={toggleMenu} class="menu-toggle button-clear"
      aria-controls="navbar-menu" aria-expanded={showMenu}
    >
    {#if showMenu}
      close
    {:else}
      menu
    {/if}
    </button>
  {/if}

  <ul id="navbar-menu" bind:this={menu} hidden on:click={() => { showMenu = false }} class:is-active={showMenu}>
   
    {#if $user.id}
      <NavbarLink url="/" text="Dashboard" />
      <NavbarLink url="/courses" text="Courses" />
      <NavbarLink url="/terms" text="Terms" />
    {/if}

    {#if $user.name && $location !== '/viewer'}
      <NavbarLink url="/me" icon="user-circle" text={$user.name}/>
      <button class="button-clear" on:click={logout}>
        <strong>Log out</strong>
      </button>
    {/if}

  </ul><!-- navbar-menu -->
    
</nav>