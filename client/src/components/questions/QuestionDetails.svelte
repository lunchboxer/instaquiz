<script>
  import DeleteQuestion from './DeleteQuestion.svelte'
  import CreateAnswer from './CreateAnswer.svelte'
  import DeleteAnswer from './DeleteAnswer.svelte'
  import { auth } from '../../data/auth'

  export let question
</script>

<style>
  li {
    list-style-type: none;
    margin: 1rem;
  }

  .answers {
    padding: 1rem;
  }
</style>

<h1 class="title">Question {question.order + 1}</h1>

<h2 class="title is-5">{question.text}</h2>

{#if $auth.role === 'Teacher'}
  <CreateAnswer questionId={question.id} />
{/if}

<section class="answers">
  {#if question.answers.length > 0}
    <ul>
      {#each question.answers as answer (answer.id)}
        <li>{answer.text} 
          {#if answer.responses.length === 0 && $auth.role === 'Teacher'}
            <DeleteAnswer id={answer.id} questionId={question.id} />
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</section>

{#if question.answers.length === 0 && $auth.role === 'Teacher'}
  <DeleteQuestion id={question.id} sessionId={question.session.id} />
{/if}

 