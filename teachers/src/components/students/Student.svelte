<script>
  import { students } from './data'
  import Loading from '../Loading.svelte'
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'

  export let params = {}

  let errors = ''
  let newPassword = ''
  let resetting = false

  $: students.getById(params.id)
  $: thisStudent = $students && $students.find(s => s.id === params.id)

  const resetPassword = async () => {
    resetting = true
    try {
      newPassword = await students.resetPassword(thisStudent.username)
      notifications.add({ text: 'Student password reset', type: 'success' })
      errors = ''
    } catch (error) {
      errors = error
      notifications.add({ text: 'Password could not be reset', type: 'danger' })
    } finally {
      resetting = false
    }

 }
  const updateUser = async (property) => {
    const inputField = event.target
    const input = {}
    input[property] = event.target.value
    try {
      await students.patch(thisStudent.id, input)
      notifications.add({ text: 'Student updated', type: 'success' })
      errors = ''
      inputField.blur()
    } catch (error) {
      errors = error
      notifications.add({ text: 'Student could not be updated', type: 'danger' })
    }
  }
</script>

<h1>Edit student</h1>

<Error {errors} />

{#if thisStudent}

  <label>Student ID</label>
  <input type="text" value={thisStudent.username} on:change={() => updateUser('username')} />
  
  <label>Name</label>
  <input type="text" value={thisStudent.name} on:change={() => updateUser('name')} />

  <h2>Courses Attending</h2>

  {#each thisStudent.coursesAttending as course (course.id)}
    <li>{course.name}</li>
  {/each}

  <section>
      {#if newPassword}
      <p>New Password is "{newPassword}".</p>
    {:else}
      <button class="button-outline" class:is-loading={resetting} disabled={resetting} on:click={resetPassword}>Reset Password</button>
    {/if}
  </section>
 
{:else}
  <Loading what="student" />
{/if}