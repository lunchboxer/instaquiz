<script>
  import { user } from '../data/user'
  import NavbarLink from './NavbarLink.svelte'
  import { notifications } from './notifications'

  const logout = async () => {
    const username = await user.logout()
    notifications.add({ text: `Logged out user '${username}'`, type: 'success' })
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

  .navbar-end {
    align-items: stretch;
    display: flex;
  }
</style>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="#/">
      <img class="logo" src="kumu-logo.png" height="28" alt="levitation logo" />
      <span class="title">InstaQuiz</span>
    </a>
  </div>

  <div class="navbar-end">
    {#if $user.name}
      <NavbarLink url="#/me" icon="user-circle" text={$user.name}/>
        
      <div class="buttons">
        <button class="button-clear" on:click={logout}>
          <strong>Log out</strong>
        </button>
      </div>
    {/if}
  </div>
</nav>