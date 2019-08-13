<script>
  import { mutate } from 'svelte-apollo'
  import { auth } from '../../data/auth'
  import { client } from '../../data/apollo'
  import { notifications } from '../notifications'
  import Modal from '../Modal.svelte'
  import { COURSE, GET_MY_SESSIONS } from '../../data/queries'
  import { CREATE_SESSION } from '../../data/mutations'
  import SessionForm from './SessionForm.svelte'

  export let courseId
  let loading = false
  let errors = ''
  let open = false

  const reset = () => {
    errors = ''
    open = false
  }

  const save = async ({ detail }) => {
    loading = true
    detail.startsAt = new Date(detail.startsAt).toISOString()
    detail.endsAt = new Date(detail.endsAt).toISOString()
    const now = new Date().toJSON()
    const latest = new Date(new Date().getTime() + 24 * 3.6e+6).toJSON()
    try {
      if (detail.startsAt < now || detail.endsAt < now) {
        throw new Error('New sessions must be in the future.')
      }
      if (detail.startsAt > detail.endsAt) {
        throw new Error('Session ends before it starts.')
      }
      await mutate(client, {
        mutation: CREATE_SESSION,
        variables: { ...detail, courseId },
        refetchQueries: [
          { query: COURSE, variables: { id: courseId } },
          { query: GET_MY_SESSIONS, variables: { id: $auth.id, now, latest } }
        ]
        // update: (cache, { data: { createSession } }) => {
        //   const data = cache.readQuery({ query: COURSE, variables: { id: courseId } })
        //   data.course.sessions.push(createSession)
        //   data.course.sessions.sort((a, b) => a.startsAt.localeCompare(b.startsAt))
        //   cache.writeQuery({ query: COURSE, data, variables: { id: courseId } })
        // }
      })
      notifications.add({ text: 'Saved new session', type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Could not save new session.',
        type: 'danger'
      })
    } finally {
      loading = false
    }
  }
</script>

<style>
  button i {
    margin-right: 0.5rem;
  }

  button {
    margin: 1rem 0;
  }
</style>

<button class="button is-primary" on:click={() => { open = true }}><i class="fas fa-plus"></i>Add a new session</button>
<Modal bind:open>
  <SessionForm on:reset={reset} on:submit={save} {errors} {loading} />
</Modal>