<script>
  import AddCourse from './AddCourse.svelte'

  export let courses = []
</script>

<AddCourse />

{#if courses.length > 0}
  {#each courses as course (course.id)}
    <li><a href="#/course/{course.id}">{course.name}</a> {course.term.name}</li>
  {/each}
{/if}