<script>
  import { user } from '../data/user'
  import Loading from './Loading.svelte'
  import DL from './DL.svelte'
</script>

<h1>User Profile</h1>

{#if $user}
<DL>
    <dt>Role:</dt>
    <dd>{$user.role}</dd>

    <dt>Student ID:</dt>
    <dd>{$user.username}</dd>

    <dt>Name:</dt>
    <dd>{$user.name}</dd>

    {#if $user.coursesAttending.length > 0}
    <dt>Courses:</dt>
    <dd>{$user.coursesAttending.length} total
      {#each $user.coursesAttending as course (course.id)}
        <li>{course.name}</li>
      {/each}
    </dd>
    {/if}

  </DL>
{:else}
  <Loading what="User" />
{/if}