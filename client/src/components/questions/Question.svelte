<script>
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import QuestionDetails from './QuestionDetails.svelte'
  import { question } from './data'

  export let params = {}

  question.get(params.id)

  $: console.log($question)
</script>

<svelte:head>
  <title>Question Details</title>
</svelte:head>

{#if $question}
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><a href="#/terms">Terms</a></li>
      <li><a href="#/term/{$question.session.course.term.id}">
        {$question.session.course.term.name}
      </a></li>
      <li><a href="#/course/{$question.session.course.id}">
        {$question.session.course.name}
      </a></li>
      <li><a href="#/session/{$question.session.id}">
        Lesson {$question.session.order}
      </a></li>
    </ul>
  </nav>

  <QuestionDetails question={$question} />
{:else}
  <Loading what="question"/>
 {/if}