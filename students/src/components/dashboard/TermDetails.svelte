<script>
  import CategorizedCourseList from '../courses/CategorizedCourseList.svelte'

  export let term
</script>

<svelte:head>
  <title>Courses</title>
</svelte:head>

<h1>My courses</h1>
<p>{term.name}</p>

<section class="term">
  <CategorizedCourseList courses={term.courses} />
</section>