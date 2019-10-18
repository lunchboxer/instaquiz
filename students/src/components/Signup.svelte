<script>
  import { user } from '../data/user'
  import { notifications } from './notifications'
  import Input from './Input.svelte'
  import Error from './Error.svelte'
  import { push } from 'svelte-spa-router'

  let username = ''
  let name = ''
  let password = ''
  let confirmpass = ''
  let code = ''
  let errors = ''
  let loading = false
  let submit
  let form

  if ($user && $user.id) push('/')

  const signup = async () => {
    let isValid = form.checkValidity()
    if (password !== confirmpass) {
      errors = 'Passwords do not match.'
      isValid = false
    }
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
      await user.signup(username.trim(), name.trim(), password.trim(), code.trim())
      errors = ''
      notifications.add({ text: `Created account for '${username}'`, type: 'success' })
      push('/')
    } catch (error) {
      errors = error
      notifications.add({ text: 'registration failed.', type: 'danger' })
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
  <title>Signup</title>
</svelte:head>

<div class="container-centered">
  <div class="login">
    <h1>创建帐号</h1>

    <Error {errors} />
    <form bind:this={form} novalidate on:submit|preventDefault={signup}>

      <Input type="text" bind:value={username} label="学号" required />

      <Input type="text" bind:value={name} label="姓名" required />

      <Input type="password" bind:value={password} label="密码" required />
      <Input type="password" label="确认密码" bind:value={confirmpass} />

      <Input type="text" bind:value={code} label="验证码" required />

      <div class="buttons">
        <a href="#/login" class="button button-clear">已有帐号</a>
        <button type="submit" class:is-loading={loading} bind:this={submit}>
          注册
        </button>
      </div>

    </form>
  </div>
</div>