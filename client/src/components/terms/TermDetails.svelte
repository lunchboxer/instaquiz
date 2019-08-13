<script>
  import { formatRelative } from 'date-fns'
  import { auth } from '../../data/auth'
  import CategorizedCourseList from '../courses/CategorizedCourseList.svelte'
  import AddCourse from '../courses/AddCourse.svelte'

  export let term

  const format = (date) => {
    const string = formatRelative(new Date(date), new Date())
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
</script>

<style>
  section.term {
    margin: 2rem 1rem;
  }
</style>

<svelte:head>
  <title>{term.name}</title>
</svelte:head>

<h1 class="title is-3">{term.name}</h1>
<p class="subtitle">{format(term.startDate)} to {format(term.endDate)}</p>

<section class="term">
  <CategorizedCourseList courses={term.courses} />

  {#if $auth.role === 'Teacher'}
    <AddCourse termId={term.id} />
  {/if}
</section>