<script>
  import TeacherQuestionCard from './TeacherQuestionCard.svelte'

  export let questions
</script>

<style>
  .question-list {
    margin-top: 1rem;
  }
</style>

<section class="question-list">
  <h2 class="title is-4">Questions</h2>
  <p>Click a question to expand.</p>
  {#if questions && questions.length}
    {#each questions as question (question.id)}
      <TeacherQuestionCard {question} />
    {/each}
  {/if}
</section>