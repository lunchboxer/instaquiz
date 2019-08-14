<script>
  import Loading from '../Loading.svelte'
  import CourseDetails from './CourseDetails.svelte'
  import { course } from './data'

  export let params = {}

  $: if ($course && $course.id !== params.id) course.set()
  $: course.get(params.id)
</script>

<svelte:head>
  <title>Course Details</title>
</svelte:head>

{#if $course}
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><a href="#/terms">Terms</a></li>
      <li><a href="#/term/{$course.term.id}">{$course.term.name}</a></li>
    </ul>
  </nav>

  <CourseDetails course={$course} />
{:else}
  <Loading what="course"/>
{/if}