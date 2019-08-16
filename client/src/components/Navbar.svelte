<script>
  import { user } from '../data/user'
  import NavbarLink from './NavbarLink.svelte'
  import { notifications } from './notifications'

  let showMenu = false

  const logout = async () => {
    const username = await user.logout()
    notifications.add({ text: `Logged out user '${username}'`, type: 'success' })
  }
</script>

<style>
  .logo {
    margin-right: 0.8rem;
  }

  .navbar {
    background: transparent;
    margin: 0;
  }

  @media only screen and (max-width: 1024px) {
    #navmenu {
      padding: 1rem;
      position: fixed;
      right: -15rem;
      width: 15rem;
      display: inherit;
      top: 0;
      bottom: 0;
      transition: 200ms ease-in-out;
      height: 100%;
      background: black;
    }

    .navbar-burger {
      z-index: 10;
    }

    #navmenu.is-active {
      transform: translate(-15rem);
    }
  }
</style>

<nav class="navbar is-black" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="#/">
      <img class="logo" src="/kumu-logo.png" height="28" alt="levitation logo" />
      <span class="title is-4">InstaQuiz</span>
    </a>

    {#if $user.username}
      <div
        role="button"
        class="navbar-burger burger"
        class:is-active={showMenu}
        aria-label="menu"
        aria-expanded="false"
        data-target="navmenu"
        on:click={() => { showMenu = !showMenu }}
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </div>
    {/if}
    </div>
  
  
    <div
      id="navmenu"
      class="navbar-menu"
      on:click={() => { showMenu = !showMenu }}
      class:is-active={showMenu}
    >
      <div class="navbar-start">
        {#if $user.role === 'Teacher'}
        <NavbarLink url="#/" text="Dashboard" icon="chalkboard-teacher" />
        <NavbarLink url="#/terms" text="Terms" icon="school" />
        <NavbarLink url="#/courses" text="Courses" icon="book" />
        {/if}
      </div>
  
      <div class="navbar-end">
        {#if $user.name}
        
          <NavbarLink url="#/me" icon="user-circle" text={$user.name}/>
         
          <div class="buttons">
            <button class="button is-text" on:click={logout}>
                  <strong>Log out</strong>
              </button>
          </div>

        {/if}
      </div>
    </div>
  </nav>