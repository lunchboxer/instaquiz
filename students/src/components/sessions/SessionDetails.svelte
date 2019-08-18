<script>
  import { formatRelative } from 'date-fns'

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

{#if session.endsAt < new Date().toJSON()}
  <section class="question-list">
    <h2>{questions.length} Questions</h2>
    {#if questions && questions.length > 0}
      {#each questions as question (question.id)}
        <li>
          {question.order + 1}. {question.text}
        </li>
      {/each}
    {/if}
  </section>
{/if}