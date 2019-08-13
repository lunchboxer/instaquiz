<script>
  import { notifications } from '../notifications'
  import { formatRelative } from 'date-fns'
  import { mutate } from 'svelte-apollo'
  import { client } from '../../data/apollo'
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
      mutate(client, {
        mutation: ASK_QUESTION,
        variables: { id: question.id }
      })
      asked = true
      notifications.add({ text: 'Successfully sent question', type: 'success' })
    } catch (error) {
      console.error(error)
      notifications.add({ text: 'Could not send question', type: 'danger' })
    } finally {
      loading = false
    }
  }
</script>

<style>
  li {
    list-style: none;
    padding: 0.5rem;
    cursor: pointer;
  }

  li:hover {
    background: black;
    border: 1px solid grey;
  }

  li.current {
    border: 1px solid grey;
    background: black;
    cursor: inherit;
  }

  li.current .question {
    font-size: 1.6rem;
  }

  button i {
    margin-right: 0.5rem;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }
</style>

<li class:current={isCurrent}>

  <div class="question" on:click={select}>
    {question.order + 1}. {question.text}
    {#if !isCurrent}
      <span class="is-pulled-right"><i class="fas fa-check"></i></span>
    {/if}
  </div>

  {#if isCurrent}
    <TeacherAnswers {question} />
    <div class="buttons">
      {#if question.asked}
        <span>Asked {formatRelative(new Date(question.asked), new Date())}</span>
      {/if}
      <button class:is-loading={loading} class="button is-primary" on:click={send}>
        <i class="fas fa-paper-plane"></i>
        {asked || question.asked ? 'Send again' : 'Send'}
      </button>
    </div>
  {/if}

</li>