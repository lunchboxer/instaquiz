<script>
  import { user } from '../../data/user'

  export let courses = []

  $: teachingIds = $user ? $user.coursesTeaching.map(c => c.id) : []
  $: attendingIds = $user ? $user.coursesAttending.map(c => c.id) : []

  $: teaching = courses && courses.filter(c => teachingIds.includes(c.id))
  $: notTeaching = courses.filter(c => !teachingIds.includes(c.id))
  $: attending = courses.filter(c => attendingIds.includes(c.id))
  $: notAttending = courses.filter(c => !attendingIds.includes(c.id))
</script>

{#if courses.length > 0}

  {#if teaching && teaching.length}
    <h3>Teaching</h3>
    {#each teaching as course (course.id)}
      <li><a href="#/course/{course.id}">{course.name}</a></li>
    {/each}
  {/if}

  {#if attending && attending.length}
    <h3>Attending</h3>
    {#each attending as course (course.id)}
      <li><a href="#/course/{course.id}">{course.name}</a></li>
    {/each}
  {/if}

  {#if $user.role === 'Teacher' && notTeaching.length > 0}
    <h3>Not teaching</h3>
    {#each notTeaching as course (course.id)}
      <li><a href="#/course/{course.id}">{course.name}</a></li>
    {/each}
  {/if}

  {#if $user.role === 'Student' && notAttending.length > 0}
    <h3>Not attending</h3>
    {#each notAttending as course (course.id)}
      <li><a href="#/course/{course.id}">{course.name}</a></li>
    {/each}
  {/if}

{/if}