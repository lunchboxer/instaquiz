<script>
  import Loading from '../Loading.svelte'
  import CourseDetails from './CourseDetails.svelte'
  import { courses } from './data'

  export let params = {}

  $: courses.get(params.id)
  $: thisCourse = $courses && $courses.find(c => c.id === params.id)
</script>

<svelte:head>
  <title>Course Details</title>
</svelte:head>

{#if thisCourse}
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><a href="#/terms">Terms</a></li>
      <li><a href="#/term/{thisCourse.term.id}">{thisCourse.term.name}</a></li>
    </ul>
  </nav>

  <CourseDetails course={thisCourse} />

{:else}
  <Loading what="course"/>
{/if}