<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { SESSION_ABSENCES_AND_STUDENTS } from '../../data/queries'
  import { MARK_STUDENT_ABSENT, UNMARK_STUDENT_ABSENT } from '../../data/mutations'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import { notifications } from '../notifications'

  export let sessionId
  let absences
  let students
  let selected
  let errors = ''
  let loading = false

  onMount(async () => {
    const response = await request(SESSION_ABSENCES_AND_STUDENTS, { sessionId })
    absences = response.absences
    students = response.session.course.students
  })
  $: studentsNotAbsent = absences && students && students.filter(s => {
    return !absences.find(a => a.student.id === s.id)
  })

  const markAbsent = async () => {
    loading = true
    try {
      const response = await request(MARK_STUDENT_ABSENT, { sessionId, studentId: selected })
      absences = [...absences, response.markStudentAbsent]
      notifications.add({ text: `${response.markStudentAbsent.student.name} marked absent`, type: 'success' })
      selected = ''
    } catch (error) {
      errors = error
    } finally {
      loading = false
    }
  }

  const unmark = async studentId => {
    try {
      const response = await request(UNMARK_STUDENT_ABSENT, { sessionId, studentId })
      const unmarked = absences.find(a => a.id === response.unmarkStudentAbsent.id)
      absences = absences.filter(a => a.id !== response.unmarkStudentAbsent.id)
      notifications.add({ text: `${unmarked.student.name} umarked absent`, type: 'success' })
    } catch (error) {
      errors = error
    }
  }
</script>

<style>
  select {
    max-width: 30rem;
  }

  .remove {
    font-size: 100%;
    margin: 0;
    padding: 0.5rem;
  }

  li {
    list-style: none;
  }
</style>

<section class="absences">
  {#if absences}
    <h2>Absences</h2>
    <p>{absences.length} students absent out of {students.length}.</p>
    {#if absences.length > 0}
      <div class="absent-students-list">
        {#each absences as absence (absence.id)}
          <li>{absence.student.name} 
            <button class="button-clear remove" on:click={() => unmark(absence.student.id)}>&times;</button>
          </li>
        {/each}
      </div>
    {/if}

    <Error {errors} />

    {#if studentsNotAbsent && studentsNotAbsent.length > 0}
      <select bind:value={selected}>
        <option value="">-- select absent student --</option>
        {#each studentsNotAbsent as student (student.id)}
          <option value={student.id}>{student.name} 
            {#if student.pinyinName && student.pinyinName !== student.name}
              ({student.pinyinName})
            {/if}
          </option>
        {/each}
      </select>
      {#if selected}
        <button class:is-loading={loading} on:click={markAbsent}>Mark absent</button>
      {/if}
    {/if}
    
  {:else}
    <Loading what="absences"/>
  {/if}
</section>