<script>
  import { push } from 'svelte-spa-router'
  import { request } from '../../data/fetch-client'
  import { notifications } from '../notifications'
  import { ADD_STUDENT_TO_COURSE } from '../../data/mutations'
  import Input from '../Input.svelte'
  import Error from '../Error.svelte'
  import { courses } from './data'
  import { user } from '../../data/user'

  let code = ''
  let form
  let submit
  let loading = false
  let errors = ''

  const join = async () => {
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
      const course = await courses.addStudent($user.id, code)
      errors = ''
      notifications.add({ text: `Student ${$user.name} added to ${course.name}`, type: 'success' })
      push('/')
    } catch (error) {
      if (error[0].code === 3039) errors = 'No course with that code was found.'
      notifications.add({ text: 'registration failed.', type: 'danger' })
    } finally {
      loading = false
      submit.disabled = false
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

<div class="container-centered">
  <div class="join-course">

    <h1>Join a course</h1>

    <p>
      Simply enter the code word given by your instructor and you'll be added to
      the course roster.
    </p>

    <br />

    <Error {errors} />
    <form bind:this="{form}" novalidate on:submit|preventDefault="{join}">

      <Input label="Code word" bind:value="{code}" required />

      <button type="submit" class:is-loading="{loading}" bind:this="{submit}">
        Join!
      </button>

    </form>
  </div>
</div>