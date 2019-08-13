<script>
  import { TERMS_AND_ALL } from '../../data/queries'
  import { query } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import AddCourse from '../courses/AddCourse.svelte'
  import DeleteCourse from '../courses/DeleteCourse.svelte'

  const terms = query(client, { query: TERMS_AND_ALL })
</script>


<style>
  .term {
    margin: 2rem 1rem;
  }
</style>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<h1 class="title is-3">Dashboard</h1>

{#await $terms}
  <Loading what="terms and courses" />
{:then result}
  {#if result && result.data && result.data.terms}
  <AddCourse />
    {#each result.data.terms as term (term.id)}
    <div class='term'>
        <li>{term.name}</li>
        <ul>
          {#each term.courses as course (course.id)}
            <li>{course.name}<DeleteCourse {course}/></li>
          {/each}
        </ul>
    </div>
     

    {/each}
  {/if}
  {:catch errors}
    <Error {errors} />
  {/await}
    
    