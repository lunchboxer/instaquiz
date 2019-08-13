<script>
  import { COURSES } from '../../data/queries'
  import { query } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import CourseList from './CourseList.svelte'

  const coursesCache = query(client, {
    query: COURSES
  })
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

<h1 class="title is-3">All Courses</h1>

{#await $coursesCache}
  <Loading what="courses"/>
{:then result}
  {#if result && result.data && result.data.courses}
    <CourseList courses={result.data.courses} />
  {/if}
{:catch errors}
  <Error {errors} />
{/await}