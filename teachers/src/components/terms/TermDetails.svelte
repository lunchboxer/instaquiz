<script>
  import { formatRelative } from 'date-fns'
  import { user } from '../../data/user'
  import CategorizedCourseList from '../courses/CategorizedCourseList.svelte'
  import AddCourse from '../courses/AddCourse.svelte'

  export let term

  const format = (date) => {
    const string = formatRelative(new Date(date), new Date())
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
</script>

<svelte:head>
  <title>{term.name}</title>
</svelte:head>

<h1>{term.name}</h1>
<p>{format(term.startDate)} to {format(term.endDate)}</p>

<section class="term">
  <CategorizedCourseList courses={term.courses} />

  {#if $user.role === 'Teacher'}
    <AddCourse termId={term.id} />
  {/if}
</section>