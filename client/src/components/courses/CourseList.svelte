<script>
  import AddCourse from './AddCourse.svelte'
  import { auth } from '../../data/auth'

  export let courses = []
</script>

{#if $auth.role === 'Teacher'}
  <AddCourse />
{/if}

{#if courses.length > 0}
  {#each courses as course (course.id)}
    <li><a href="#/course/{course.id}">{course.name}</a> {course.term.name}</li>
  {/each}
{/if}