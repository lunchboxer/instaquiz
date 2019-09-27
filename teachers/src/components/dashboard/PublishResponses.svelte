<script>
  import { request } from '../../data/fetch-client'
  import { notifications } from '../notifications'
  import { PUBLISH_RESPONSES } from '../../data/mutations'

  let loading = false
  export let question

  const publish = async () => {
    loading = true
    try {
      await request(PUBLISH_RESPONSES, { questionId: question.id })
      // set published is true in $activeSession.questions[thisone]
      notifications.add({ text: 'Successfully published responses', type: 'success' })
    } catch (error) {
      notifications.add({ text: 'Could not publish responses', type: 'danger' })
    } finally {
      loading = false
    }
  }
</script>

<button class="button-outline" on:click={publish} class:is-loading={loading} disabled={loading}>Publish
  responses</button>