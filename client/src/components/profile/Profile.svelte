<script>
  import { me } from './data'
  import Loading from '../Loading.svelte'
  import DL from '../DL.svelte'
</script>

<h1 class="title">User Profile</h1>

{#if $me}
<DL>
    <dt>Role:</dt>
    <dd>{$me.role}</dd>

    <dt>{$me.role === 'Student' ? 'Student ID:' : 'Username:'}</dt>
    <dd>{$me.username}</dd>

    <dt>Name:</dt>
    <dd>{$me.name}</dd>
    
    <dt>ID:</dt>
    <dd>{$me.id}</dd>

    {#if $me.coursesAttending.length > 0}
    <dt>Courses attending:</dt>
    <dd>{$me.coursesAttending.length} total 
      {#each $me.coursesAttending as course (course.id)}
        <li>{course.name}</li>
      {/each}
    </dd>
    {/if}

    {#if $me.coursesTeaching.length > 0}
    <dt>Courses teaching:</dt>
    <dd>{$me.coursesTeaching.length} total 
      {#each $me.coursesTeaching as course (course.id)}
        <li>{course.name}</li>
      {/each}
    </dd>
    {/if}

  </DL>
{:else}
  <Loading what="User" />
{/if}