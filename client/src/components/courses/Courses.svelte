<script>
  import { courses } from './data'
  import Loading from '../Loading.svelte'
  import CourseList from './CourseList.svelte'
</script>

<svelte:head>
  <title>Courses</title>
</svelte:head>

<nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li><a href="#/">Home</a></li>
    <li><a href="#/Terms">Terms</a></li>
  </ul>
</nav>

<h1>All Courses</h1>

{#if $courses}
  <CourseList courses={$courses} />
{:else}
  <Loading what="courses"/>
{/if}