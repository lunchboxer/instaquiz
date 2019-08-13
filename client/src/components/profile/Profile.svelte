<script>
  import { query } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import { ME } from '../../data/queries'
  import Loading from '../Loading.svelte'
  import DL from '../DL.svelte'
  import Error from '../Error.svelte'

  const me = query(client, { query: ME })
</script>

<h1 class="title">User Profile</h1>

{#await $me}
  <Loading what="User" />
{:then result}
  {#if result.data && result.data.me}
    <DL>
      <dt>Role:</dt>
      <dd>{result.data.me.role}</dd>

      <dt>{result.data.me.role === 'Student' ? 'Student ID:' : 'Username:'}</dt>
      <dd>{result.data.me.username}</dd>

      <dt>Name:</dt>
      <dd>{result.data.me.name}</dd>
      
      <dt>ID:</dt>
      <dd>{result.data.me.id}</dd>

      {#if result.data.me.coursesAttending.length > 0}
      <dt>Courses attending:</dt>
      <dd>{result.data.me.coursesAttending.length} total 
        {#each result.data.me.coursesAttending as course (course.id)}
          <li>{course.name}</li>
        {/each}
      </dd>
      {/if}

      {#if result.data.me.coursesTeaching.length > 0}
      <dt>Courses teaching:</dt>
      <dd>{result.data.me.coursesTeaching.length} total 
        {#each result.data.me.coursesTeaching as course (course.id)}
          <li>{course.name}</li>
        {/each}
      </dd>
      {/if}

    </DL>
  {/if}
{:catch errors}
  <Error {errors} />
{/await}