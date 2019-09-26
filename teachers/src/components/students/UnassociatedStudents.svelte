<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { UNASSOCIATED_STUDENTS } from '../../data/queries'

  let students = []

  onMount(async () => {
    const response = await request(UNASSOCIATED_STUDENTS)
    if (response && response.users && response.users.length > 0) {
      students = response.users
    }
  })
</script>

{#if students.length > 0}
  <h2>Unassociated students</h2>
  {#each students as student (student.id)}
    <li><a href="#/student/{student.id}">#{student.username} - {student.name}</a></li>
  {/each}
{/if}