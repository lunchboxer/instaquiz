<script>
  import DeleteQuestion from './DeleteQuestion.svelte'
  import CreateAnswer from './CreateAnswer.svelte'
  import DeleteAnswer from './DeleteAnswer.svelte'
  import QuestionResults from './QuestionResults.svelte'

  export let question
</script>

<h3>{question.order + 1}) {question.text}</h3>

{#if question.asked}
  <QuestionResults asked={question.asked} answers={question.answers} />
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


 