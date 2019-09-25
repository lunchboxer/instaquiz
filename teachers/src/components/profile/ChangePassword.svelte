<script>
  import { user } from '../../data/user'
  import Input from '../Input.svelte'
  import Error from '../Error.svelte'
  import { notifications } from '../notifications'

  let show = false
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
      errors = ''
      notifications.add({ text: 'Your password was changed.', type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({ text: 'Password could not be changed.', type: 'danger' })
    } finally {
      loading = false
      submit.disabled = false
    }
  }

  const reset = () => {
    show = false
    oldPassword = ''
    newPassword = ''
    newPasswordConfirm = ''
    form.reset()
  }
</script>

{#if show}
  <Error {errors} />

  <form bind:this={form} novalidate on:submit|preventDefault={changePassword}>
    <Input type="password" bind:value={oldPassword} label="Current password" required/>
    <Input type="password" bind:value={newPassword} label="New password" required />
    <Input type="password" bind:value={newPasswordConfirm} label="Confirm new password" required />
    <button class="button-clear" on:click={reset}>Cancel</button>
    <button type="submit" class:is-loading={loading} bind:this={submit}>Save</button>
  </form>
 
{:else}
  <button on:click={() => { show = true }}>Change Password</button>
{/if}