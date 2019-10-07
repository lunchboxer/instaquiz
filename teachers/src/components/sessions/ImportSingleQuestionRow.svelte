<script>
  import { session, questions } from './data'
  import { notifications } from '../notifications'
  import { request } from '../../data/fetch-client'
  import { CREATE_QUESTION } from '../../data/mutations'

  export let question
  let errors = ''

  $: isAdded = !!$session.questions.find(q => q.text === question.text)

  const add = async () => {
    if (isAdded) return
    try {
      await request(CREATE_QUESTION, {
        input: {
          text: question.text,
          session: { connect: { id: $session.id } },
          answers: {
            create: question.answers.map(a => ({ text: a.text }))
          }
        }
      })
      session.get($session.id)
      notifications.add({ text: `Added ${question.text}`, type: 'success' })
    } catch (error) {
      errors = error
      console.error(error)
      notifications.add({ text: `Question couldn't be added - ${question.text}`, type: 'danger' })
    }
  }
</script>

<style>
  li {
    list-style: none;

  }

  li:not(.isAdded) {
    cursor: pointer;
  }

  li:not(.isAdded):hover {
    background: black;
  }

  .isAdded {
    color: #666;
  }
</style>

<li on:click={add} class:isAdded>
  {#if isAdded}&checkmark;{/if}
  {question.order}) {question.text}
</li>