<script>
  import { DELETE_RESPONSE } from '../../data/mutations'
  import { request } from '../../data/fetch-client'
  import { notifications } from '../notifications'

  export let answers
  let show = false

  const findDuplicateResponses = () => {
    const allResponses = answers.flatMap(a => a.responses)
    // the most straight-forward and least efficient way
    // compare every result to every other result
    const duplicates = []
    const groupedByStudent = {}
    allResponses.forEach(response => {
      if (!groupedByStudent[response.student.id]) {
        groupedByStudent[response.student.id] = [response]
      } else {
        groupedByStudent[response.student.id].push(response)
      }
    })
    for (const studentId in groupedByStudent) {
      if (groupedByStudent[studentId].length > 1) {
        duplicates.push(groupedByStudent[studentId].sort((a, b) => {
          return b.createdAt.localeCompare(a.createdAt)
        }))
      }
    }
    return duplicates
  }

  $: duplicateResponses = answers && show && findDuplicateResponses()

  const remove = async id => {
    try {
      await request(DELETE_RESPONSE, { id })
      notifications.add({ text: `removed response ${id}`, type: 'success' })
    } catch (error) {
      notifications.add({ text: `could not remove response ${id}`, type: 'danger' })
      console.error(error)
    }
  }
</script>

<button on:click={() => { show = true }}>Find Duplicate responses</button>
{#if duplicateResponses && duplicateResponses.length > 0}
  <h3>Duplicate reponses</h3>
  {#each duplicateResponses as dupe}
    <li>{dupe.length} similar responses</li>
    <ul>
      {#each dupe as response, index (response.id)}
        <li>
          {response.id} - {new Date(response.createdAt).toLocaleString()}, student:{response.student.id}, session: {response.session.id}
          {#if index !== 0}
            <button class="button-clear" on:click={() => remove(response.id)}>delete</button>
          {/if}
        </li>
      {/each}
    </ul>
  {/each}
{/if}