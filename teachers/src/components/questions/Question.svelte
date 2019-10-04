<script>
  import Loading from '../Loading.svelte'
  import QuestionDetails from './QuestionDetails.svelte'
  import { question } from './data'
  import { questions } from '../sessions/data'
  import SwipeNav from '../SwipeNav.svelte'

  export let params = {}

  $: question.get(params.id)

  $: if ($question && !$questions) questions.get($question.session.id)

  $: nextQuestion = $questions && $question && $questions.find(q => q.order === $question.order + 1)
  $: previousQuestion = $questions && $question && $questions.find(q => q.order === $question.order - 1)
</script>

<svelte:head>
  <title>Question Details</title>
</svelte:head>

<style>
  .in-a-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .details {
    width: 100%;
  }

  .previous,
  .next {
    padding: 0;
    margin: 0;
    width: 48px;
    height: 48px;
  }

  .previous a svg,
  .next a svg {
    fill: #ccc;
    width: 48px;
    height: 48px;
    margin: 0;
    padding: 0;
  }

  @media (hover: none) and (pointer: coarse) {

    .previous,
    .next {
      display: none;
    }
  }
</style>

{#if $question}
  <SwipeNav 
    next={nextQuestion && `/question/${nextQuestion.id}`}
    previous={previousQuestion && `/question/${previousQuestion.id}`} />

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

  <div class="in-a-row">
    <div class="previous">
      {#if previousQuestion}
        <a  href="#/question/{previousQuestion.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
        </a>
      {/if}
    </div>
  
    <div class="details">
        <QuestionDetails question={$question} />
    </div>
   
    <div class="next">
      {#if nextQuestion}
        <a href="#/question/{nextQuestion.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
        </a>
      {/if}
    </div>
  </div>
  
{:else}
  <Loading what="question"/>
 {/if}