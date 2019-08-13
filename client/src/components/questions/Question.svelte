<script>
  import { QUESTION } from '../../data/queries'
  import { query } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import QuestionDetails from './QuestionDetails.svelte'

  export let params = {}

  const questionCache = query(client, {
    query: QUESTION,
    variables: { id: params.id }
  })
</script>

<svelte:head>
  <title>Question Details</title>
</svelte:head>

{#await $questionCache}
  <Loading what="question"/>
{:then result}
  {#if result && result.data && result.data.question}
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li><a href="#/terms">Terms</a></li>
        <li><a href="#/term/{result.data.question.session.course.term.id}">
          {result.data.question.session.course.term.name}
        </a></li>
        <li><a href="#/course/{result.data.question.session.course.id}">
          {result.data.question.session.course.name}
        </a></li>
        <li><a href="#/session/{result.data.question.session.id}">
          Lesson {result.data.question.session.order}
        </a></li>
      </ul>
    </nav>

    <QuestionDetails question={result.data.question} />
  {/if}
{:catch errors}
  <Error {errors} />
{/await}