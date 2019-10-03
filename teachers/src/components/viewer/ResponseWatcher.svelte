<script>
  import { ws } from '../../data/ws-client'
  import { request } from '../../data/fetch-client'
  import { RESPONSES, RESPONSE_SUBSCRIPTION } from '../../data/queries'
  import { responses } from '../dashboard/stores'

  export let question
  let subscription

  $: if (question) {
    if (subscription) subscription.unsubscribe()
    request(RESPONSES, { questionId: question.id })
      .then(response => responses.set(response.responses))

    subscription = ws.request({
      query: RESPONSE_SUBSCRIPTION,
      variables: { questionId: question.id }
    })
      .subscribe({
        next (result) {
          responses.update(previous => {
            if (!previous) return [result.data.responses]
            const filtered = previous.filter(r => r.id !== result.data.responses.id)
            const newOne = result.data.responses
            return [newOne, ...filtered]
          })
        }
      })
  }
</script>