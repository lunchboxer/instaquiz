<script>
  import { push } from 'svelte-spa-router'
  import { user } from '../data/user'
  import { notifications } from './notifications'
  import Input from './Input.svelte'
  import Error from './Error.svelte'

  let username = ''
  let password = ''
  let errors = ''
  let loading = false
  let submit
  let form

  const login = async () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger'
      })
      return
    }
    loading = true
    submit.disabled = true
    try {
      await user.login(username.trim(), password.trim())
      notifications.add({ text: `Logged in as '${username}'`, type: 'success' })
      if ($user.passwordIsTemporary) {
        push('/change-password')
      }
    } catch (error) {
      errors = error
      notifications.add({ text: 'Login failed.', type: 'danger' })
      submit.disabled = false
    } finally {
      loading = false
    }
  }
</script>

<style>
  .container-centered {
    margin-top: 10vh;
    display: flex;
    justify-content: center;
  }
</style>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="container-centered">
  <div class="login">

    <h1>登录</h1>

    <Error {errors} />
    <form bind:this={form} novalidate on:submit|preventDefault={login}>

      <Input type="text" bind:value={username} label="学号" required />

      <Input type="password" bind:value={password} label="密码" required />

      <div class="buttons">
        <a href="#/signup" class="button button-clear">创建帐号</a>
        <button type="submit" class:is-loading={loading} bind:this={submit}>
          登入
        </button>
      </div>

    </form>
  </div>
</div>