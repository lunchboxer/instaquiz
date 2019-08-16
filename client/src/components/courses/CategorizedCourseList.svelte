<script>
  import { user } from '../../data/user'
  import { me } from '../profile/data'

  export let courses = []

  $: teachingIds = $me ? $me.coursesTeaching.map(c => c.id) : []
  $: attendingIds = $me ? $me.coursesAttending.map(c => c.id) : []

  $: teaching = courses && courses.filter(c => teachingIds.includes(c.id))
  $: notTeaching = courses.filter(c => !teachingIds.includes(c.id))
  $: attending = courses.filter(c => attendingIds.includes(c.id))
  $: notAttending = courses.filter(c => !attendingIds.includes(c.id))
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

  {#if $user.role === 'Teacher' && notTeaching.length > 0}
    <h2 class="title is-5">Not teaching</h2>
    {#each notTeaching as course (course.id)}
      <li><a href="#/course/{course.id}">{course.name}</a></li>
    {/each}
  {/if}

  {#if $user.role === 'Student' && notAttending.length > 0}
    <h2 class="title is-5">Not attending</h2>
    {#each notAttending as course (course.id)}
      <li><a href="#/course/{course.id}">{course.name}</a></li>
    {/each}
  {/if}

{/if}