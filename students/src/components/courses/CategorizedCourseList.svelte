<script>
  import { user } from '../../data/user'

  export let courses = []

  $: attendingIds = $user ? $user.coursesAttending.map(c => c.id) : []

  $: attending = courses.filter(c => attendingIds.includes(c.id))
</script>

<style>
  .button {
    margin-top: 2rem;
  }
</style>

{#if courses.length > 0}

  {#if attending && attending.length}
    {#each attending as course (course.id)}
      <li>{course.name}</li>
    {/each}
  {/if}

  <a href="#/join-course" class="button">Join a course</a>

{:else}

  <p>There are no courses for this term yet.</p>
  
{/if}