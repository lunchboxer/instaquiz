<script>
  import { notifications } from '../notifications'
  import { formatRelative } from 'date-fns'
  import { request } from '../../data/fetch-client'
  import { currentQuestion } from './stores'
  import { ASK_QUESTION } from '../../data/mutations'
  import TeacherAnswers from './TeacherAnswers.svelte'

  export let question
  let asked = false
  let loading = false

  $: isCurrent = $currentQuestion && $currentQuestion.id === question.id

  const select = () => {
    currentQuestion.set(question)
  }
  const send = async () => {
    loading = true
    try {
      await request(ASK_QUESTION, { id: question.id })
      asked = true
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
    {#if !isCurrent && asked}
      <span>&check;</span>
    {/if}
  </div>

  {#if isCurrent}
    <TeacherAnswers {question} />
    <div class="buttons">
      {#if question.asked}
        <span>Asked {formatRelative(new Date(question.asked), new Date())}</span>
      {/if}
      <button class:is-loading={loading} on:click={send}>
        {asked || question.asked ? 'Send again' : 'Send'}
      </button>
    </div>
  {/if}

</li>