<script>
  import { location, push } from 'svelte-spa-router'
  import Input from './Input.svelte'
  import Error from './Error.svelte'
  import { user } from '../data/user'
  import { notifications } from './notifications'

  let oldPassword = ''
  let newPassword = ''
  let newPasswordConfirm = ''
  let errors = ''
  let form
  let loading = false
  let submit

  const changePassword = async () => {
    const isValid = form.checkValidity()
    if (!isValid) return
    loading = true
    submit.disabled = true
    try {
      await user.changePassword(oldPassword, newPassword)
      notifications.add({ text: 'Password changed', type: 'success' })
      reset()
      if ($location === '/reset-password') {
        push('/')
      }
    } catch (error) {
      errors = error
    } finally {
      loading = false
      submit.disabled = false
    }
  }

  const reset = () => {
    errors = ''
    oldPassword = ''
    newPassword = ''
    newPasswordConfirm = ''
    form.reset()
  }
</script>

{#if $location === '/reset-password'}
  <h2>Change your password.</h2>
{/if}

<Error {errors} />

<form bind:this={form} novalidate on:submit|preventDefault={changePassword}>
  <Input type="password" bind:value={oldPassword} label="Current password" required />
  <Input type="password" bind:value={newPassword} label="New password" required /> 
  <Input type="password" bind:value={newPasswordConfirm} label="Confirm new password" required />
  <button class="button-clear" on:click={reset}>Cancel</button>
  <button type="submit" class:is-loading={loading} bind:this={submit}>Save</button>
</form>