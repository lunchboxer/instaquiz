<script>
  import { formatRelative } from 'date-fns'
  import CreateQuestion from '../questions/CreateQuestion.svelte'
  import { user } from '../../data/user'
  import ImportQuestions from './ImportQuestions.svelte'

  export let session

  const formatDate = (date) => {
    const string = formatRelative(new Date(date), new Date())
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  $: questions = session && session.questions.slice(0).sort((a, b) => {
    return a.order - b.order
  })
</script>

<style>
  li {
    list-style-type: none;
  }
</style>

<h1>Lesson {session.order}</h1>
<p>{formatDate(session.startsAt)} to {formatDate(session.endsAt)}</p>

{#if session.endsAt > new Date().toJSON()}
  <ImportQuestions sessionId={session.id} />
  <CreateQuestion sessionId={session.id} />
{/if}

<section class="question-list">
  <h2>{questions.length} Questions</h2>
  {#if questions && questions.length > 0}
    {#each questions as question (question.id)}
      <li>
        {question.order + 1}. <a href="#/question/{question.id}">{question.text}</a>
      </li>
    {/each}
  {/if}
</section>