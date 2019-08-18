<script>
  import DeleteQuestion from './DeleteQuestion.svelte'
  import CreateAnswer from './CreateAnswer.svelte'
  import DeleteAnswer from './DeleteAnswer.svelte'
  import { user } from '../../data/user'

  export let question
</script>

<h1>Question {question.order + 1}</h1>

<h2>{question.text}</h2>

{#if $user.role === 'Teacher'}
  <CreateAnswer questionId={question.id} />
{/if}

<h2>Answers</h2>
<section class="answers">
  {#if question.answers.length > 0}
    <ul>
      {#each question.answers as answer (answer.id)}
        <li>{answer.text} 
          {#if answer.responses.length === 0 && $user.role === 'Teacher'}
            <DeleteAnswer id={answer.id} questionId={question.id} />
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</section>

{#if question.answers.length === 0 && $user.role === 'Teacher'}
  <DeleteQuestion {question} />
{/if}

 