<script>
  import { user } from '../data/user'
  import Loading from './Loading.svelte'
  import DL from './DL.svelte'
  import Input from './Input.svelte'
  import Error from './Error.svelte'

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
    } catch (error) {
      errors = error
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

<svelte:head>
  <title>User Profile</title>
</svelte:head>

<h1>User Profile</h1>

{#if $user}
<DL>
    <dt>Role:</dt>
    <dd>{$user.role}</dd>

    <dt>Student ID:</dt>
    <dd>{$user.username}</dd>

    <dt>Name:</dt>
    <dd>{$user.name}</dd>

    {#if $user.coursesAttending.length > 0}
    <dt>Courses:</dt>
    <dd>{$user.coursesAttending.length} total
      {#each $user.coursesAttending as course (course.id)}
        <li>{course.name}</li>
      {/each}
    </dd>
    {/if}

  </DL>

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

{:else}
  <Loading what="User" />
{/if}