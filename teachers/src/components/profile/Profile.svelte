<script>
  import { user } from '../../data/user'
  import Loading from '../Loading.svelte'
  import DL from '../DL.svelte'
  import ChangePassword from './ChangePassword.svelte'
</script>

<h1>User Profile</h1>

{#if $user}
<DL>
    <dt>Role:</dt>
    <dd>{$user.role}</dd>

    <dt>Username:</dt>
    <dd>{$user.username}</dd>

    <dt>Name:</dt>
    <dd>{$user.name}</dd>
    
    <dt>ID:</dt>
    <dd>{$user.id}</dd>

    {#if $user.coursesAttending.length > 0}
    <dt>Attending:</dt>
    <dd>{$user.coursesAttending.length} total
      {#each $user.coursesAttending as course (course.id)}
        <li>{course.name}</li>
      {/each}
    </dd>
    {/if}

    {#if $user.coursesTeaching.length > 0}
    <dt>Teaching:</dt>
    <dd>{$user.coursesTeaching.length} total 
      {#each $user.coursesTeaching as course (course.id)}
        <li>{course.name}</li>
      {/each}
    </dd>
    {/if}

  </DL>

  <ChangePassword />
{:else}
  <Loading what="User" />
{/if}