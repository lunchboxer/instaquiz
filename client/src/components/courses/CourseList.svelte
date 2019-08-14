<script>
  import AddCourse from './AddCourse.svelte'

  export let courses = []
  let sortedCourses = []

  $: sortedCourses = [...courses].sort((a, b) => {
    if (a.term === b.term) return a.name.localeCompare(b.name)
    return a.term.startDate.localeCompare(b.term.startDate)
  })
</script>

<AddCourse />

{#each sortedCourses as course (course.id)}
  <li><a href="#/course/{course.id}">{course.name}</a> {course.term.name}</li>
{/each}