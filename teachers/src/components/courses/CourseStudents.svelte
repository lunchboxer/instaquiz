<script>
  import Loading from '../Loading.svelte'
  import { courses } from './data'
  import { students } from '../students/data'
  export let params = {}

  students.getByCourse(params.id)
  $: if (!$courses) { courses.get(params.id) }
  $: thisCourse = $courses && $courses.find(c => c.id === params.id)
</script>

<svelte:head>
  <title>Students</title>
</svelte:head>

{#if thisCourse}
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><a href="#/terms">Terms</a></li>
      <li><a href="#/term/{thisCourse.term.id}">{thisCourse.term.name}</a></li>
      <li><a href="#/course/{thisCourse.id}">{thisCourse.name}</a></li>
    </ul>
  </nav>

  <h1>Student List</h1>

  {#if $students}
    <ul>
      {#each $students as student (student.id)}
        <li>#{student.username} - {student.name} <a href="#/student/{student.id}" class="button button-clear">edit</a></li>
      {/each}
    </ul>
  {:else}
    <Loading what="students"/>
  {/if}
{:else}
  <Loading what="course"/>
{/if}