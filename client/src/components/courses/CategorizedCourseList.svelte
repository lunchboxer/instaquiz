<script>
  import { auth } from '../../data/auth'

  export let courses = []

  $: teaching = courses && courses.filter(c => c.teachers.find(t => t.id === $auth.id))
  $: notTeaching = courses.filter(c => !c.teachers.find(t => t.id === $auth.id))
  $: attending = courses.filter(c => c.students.find(s => s.id === $auth.id))
  $: notAttending = courses.filter(c => !c.students.find(s => s.id === $auth.id))
</script>

<style>
  h2.title {
    margin: 2rem 0 1rem;
  }
</style>
{#if courses.length > 0}

  {#if teaching && teaching.length}
    <h2 class="title is-5">Teaching</h2>
    {#each teaching as course (course.id)}
      <li><a href="#/course/{course.id}">{course.name}</a></li>
    {/each}
  {/if}

  {#if attending && attending.length}
    <h2 class="title is-5">Attending</h2>
    {#each attending as course (course.id)}
      <li><a href="#/course/{course.id}">{course.name}</a></li>
    {/each}
  {/if}

  {#if $auth.role === 'Teacher' && notTeaching.length > 0}
    <h2 class="title is-5">Not teaching</h2>
    {#each notTeaching as course (course.id)}
      <li><a href="#/course/{course.id}">{course.name}</a></li>
    {/each}
  {/if}

  {#if $auth.role === 'Student' && notAttending.length > 0}
    <h2 class="title is-5">Not attending</h2>
    {#each notAttending as course (course.id)}
      <li><a href="#/course/{course.id}">{course.name}</a></li>
    {/each}
  {/if}

{/if}