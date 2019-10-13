<script>
  import { request } from '../../data/fetch-client'
  import { notifications } from '../notifications'
  import { HIDE_QUESTION } from '../../data/mutations'
  import { activeSession } from './stores'

  export let question

  $: console.log(question)

  let loading = false

  const hide = async () => {
    loading = true
    try {
      const response = await request(HIDE_QUESTION, { id: question.id, input: { showInViewer: false } })
      notifications.add({ text: 'Question hidden', type: 'success' })
      activeSession.update(previous => {
        const questions = previous.questions.map(q => {
          if (q.id === question.id) return response.updateQuestion
          return q
        })
        return { ...previous, questions }
      })
    } catch (error) {
      notifications.add({ text: 'Question not hidden', type: 'danger' })
      console.error(error)
    } finally {
      loading = false
    }
  }
</script>

{#if question.showInViewer}
  <button on:click={hide} class:is-loading={loading} class="button-outline">Hide</button>
{/if}