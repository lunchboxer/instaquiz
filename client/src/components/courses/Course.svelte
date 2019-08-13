<script>
  import { COURSE } from '../../data/queries'
  import { query } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import CourseDetails from './CourseDetails.svelte'

  export let params = {}

  const courseCache = query(client, {
    query: COURSE,
    variables: { id: params.id }
  })
</script>

<svelte:head>
  <title>Course Details</title>
</svelte:head>

{#await $courseCache}
  <Loading what="course"/>
{:then result}
  {#if result && result.data && result.data.course}
  <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li><a href="#/terms">Terms</a></li>
        <li><a href="#/term/{result.data.course.term.id}">{result.data.course.term.name}</a></li>
      </ul>
    </nav>
  
    <CourseDetails course={result.data.course} />
  {/if}
{:catch errors}
  <Error {errors} />
{/await}