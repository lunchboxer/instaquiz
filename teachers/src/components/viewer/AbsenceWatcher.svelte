<script>
  import { onMount } from 'svelte'
  import { notifications } from '../notifications'
  import { ws } from '../../data/ws-client'
  import { request } from '../../data/fetch-client'
  import { absences } from './stores'
  import { ABSENCE_SUBSCRIPTION, SESSION_ABSENCES } from '../../data/queries'

  export let session

  onMount(async () => {
    const response = await request(SESSION_ABSENCES, { sessionId: session.id })
    absences.set(response.absences)
    students.set(response.session.course.students)
    const subscription = ws.request({
      query: ABSENCE_SUBSCRIPTION,
      variables: { sessionId: session.id }
    })
      .subscribe({
        next ({ data }) {
          if (data && data.absences) {
            if (data.absences.mutation === 'CREATED') {
              notifications.add({
                text: `${data.absences.node.student.name} marked absent.`,
                type: 'danger'
              })
              absences.update(previous => previous ? [...previous, data.absences.node] : [data.absences.node])
            } else {
              const deletedAbsence = absences.find(a => a.id === data.absences.previousValues.id)
              absences.update(previous => previous && previous.filter(a => a.id !== deletedAbsence.id))
              notifications.add({
                text: `${deletedAbsence.student.name} marked present.`,
                type: 'success'
              }, 5000)
            }
          }
        }
      })
    return () => subscription && subscription.unsubscribe()
  })
</script>