<script>
  import { notifications } from '../notifications'
  import { formatRelative } from 'date-fns'
  import { request } from '../../data/fetch-client'
  import { currentQuestion, activeSession } from './stores'
  import { ASK_QUESTION } from '../../data/mutations'
  import TeacherAnswers from './TeacherAnswers.svelte'
  import PublishResponses from './PublishResponses.svelte'
  import HideQuestion from './HideQuestion.svelte'

  export let question
  let loading = false

  $: isCurrent = $currentQuestion && $currentQuestion.id === question.id

  const select = () => {
    currentQuestion.set(question)
  }
  const send = async () => {
    loading = true
    try {
      const response = await request(ASK_QUESTION, { id: question.id })
      activeSession.update(previous => {
        const questions = previous.questions.map(q => {
          if (q.id === question.id) return response.askQuestion
          return q
        })
        return { ...previous, questions }
      })
      notifications.add({ text: 'Successfully sent question', type: 'success' })
    } catch (error) {
      notifications.add({ text: 'Could not send question', type: 'danger' })
    } finally {
      loading = false
    }
  }
</script>

<style>
  li {
    list-style: none;
    padding: 1rem;
    cursor: pointer;
  }

  li:hover {
    background: black;
  }

  li.current {
    background: black;
    cursor: inherit;
  }

  li.current .question {
    font-size: 1.6rem;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>

<li class:current={isCurrent}>

  <div class="question" on:click={select}>
    {question.order + 1}. {question.text}
    {#if !isCurrent && question.asked}
      <span>&check;</span>
    {/if}
  </div>

  {#if isCurrent}
    <TeacherAnswers {question} />
    {#if question.asked}
    <span>Asked {formatRelative(new Date(question.asked), new Date())}</span>
  {/if}
    <div class="buttons">

      <button class:is-loading={loading} on:click={send}>
        {question.asked ? 'Send again' : 'Send'}
      </button>
      <HideQuestion {question} />
      <PublishResponses {question} />
    </div>
  {/if}

</li>