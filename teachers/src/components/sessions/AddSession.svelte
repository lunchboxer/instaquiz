<script>
  import { format } from 'date-fns'
  import { user } from '../../data/user'
  import { courses } from '../courses/data'
  import { request } from '../../data/fetch-client'
  import { notifications } from '../notifications'
  import { CREATE_SESSION } from '../../data/mutations'
  import { sessions } from '../dashboard/stores'
  import ModalForm from '../ModalForm.svelte'
  import Input from '../Input.svelte'

  export let courseId
  let loading = false
  let errors = ''
  let open = false
  let startsAt = ''
  let endsAt = ''

  const save = async () => {
    loading = true
    startsAt = new Date(startsAt).toISOString()
    endsAt = new Date(endsAt).toISOString()
    const now = new Date().toJSON()
    const latest = new Date(new Date().getTime() + 24 * 3.6e+6).toJSON()
    try {
      if (startsAt < now || endsAt < now) {
        throw new Error('New sessions must be in the future.')
      }
      if (startsAt > endsAt) {
        throw new Error('Session ends before it starts.')
      }
      const { createSession } = await request(CREATE_SESSION, { startsAt, endsAt, courseId })
      await sessions.patch(createSession, $user.id, now, latest)
      courses.update(previous => previous && previous.map(course => {
        if (course.id !== createSession.course.id) return course
        return { ...course, sessions: [...course.sessions, createSession] }
      }))
      notifications.add({ text: 'Saved new session', type: 'success' })
      open = false
      errors = ''
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

<button on:click={() => { open = true }}>Add a new session</button>

<ModalForm heading="New session" {errors} {loading} on:submit={save} bind:open>
  <Input label="Start time" type="datetime-local" bind:value={startsAt} required min={format(new
    Date(), "yyyy-MM-dd'T'HH:mm")} />
  <Input label="End time" type="datetime-local" bind:value={endsAt} required min={format(new
    Date(), "yyyy-MM-dd'T'HH:mm")} />
</ModalForm>