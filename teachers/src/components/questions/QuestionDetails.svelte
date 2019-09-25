<script>
  import DeleteQuestion from './DeleteQuestion.svelte'
  import CreateAnswer from './CreateAnswer.svelte'
  import DeleteAnswer from './DeleteAnswer.svelte'
  import QuestionResults from './QuestionResults.svelte'

  export let question
</script>

<h1>Question {question.order + 1}</h1>

<h2>{question.text}</h2>

{#if question.asked}
  <QuestionResults {question} />
{:else}
  <CreateAnswer questionId={question.id} />

  <h2>Answers</h2>
  <section class="answers">
    {#if question.answers.length > 0}
      <ul>
        {#each question.answers as answer (answer.id)}
          <li>{answer.text} 
            {#if answer.responses.length === 0}
              <DeleteAnswer id={answer.id} questionId={question.id} />
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  </section>
{/if}

{#if question.answers.length === 0}
  <DeleteQuestion {question} />
{/if}


 