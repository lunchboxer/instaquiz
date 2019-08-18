<script>
  import { user } from '../../data/user'

  export let courses = []

  $: attendingIds = $user ? $user.coursesAttending.map(c => c.id) : []

  $: attending = courses.filter(c => attendingIds.includes(c.id))
  $: notAttending = courses.filter(c => !attendingIds.includes(c.id))
</script>

<h2>Courses</h2>

{#if courses.length > 0}

  {#if attending && attending.length}
    <h3>Attending</h3>
    {#each attending as course (course.id)}
      <li><a href="#/course/{course.id}">{course.name}</a></li>
    {/each}
  {/if}

  {#if notAttending.length > 0}
    <h3>Not attending</h3>
    {#each notAttending as course (course.id)}
      <li><a href="#/course/{course.id}">{course.name}</a></li>
    {/each}
  {/if}

  <a href="#/join-course" class="button">Join a course</a>
{:else}
  <p>There are no courses for this term yet.</p>
{/if}