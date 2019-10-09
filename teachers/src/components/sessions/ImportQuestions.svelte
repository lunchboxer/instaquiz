<script>
  import { terms } from '../terms/data'
  import { courses } from '../courses/data'
  import { IMPORT_QUESTIONS } from '../../data/mutations'
  import { request } from '../../data/fetch-client'
  import { session, questions } from './data'
  import { notifications } from '../notifications'
  import ImportQuestionsList from './ImportQuestionsList.svelte'

  export let sessionId

  let show = false
  let termId = ''
  let courseId = ''
  let importFromSessionId = ''
  let loading = false

  $: if (courseId) courses.get(courseId)
  $: thisCourse = $courses && $courses.find(c => c.id === courseId)
  $: termCourses = $courses && $courses.filter(c => c.term.id === termId)

  const formatDate = (date) => {
    const dateDate = new Date(date)
    return `${dateDate.toDateString()} ${dateDate.toLocaleTimeString()}`
  }

  const copyQuestions = async () => {
    loading = true
    try {
      const response = await request(IMPORT_QUESTIONS, {
        toSessionId: sessionId,
        fromSessionId: importFromSessionId
      })
      const sessionQuestions = response.importQuestions.questions
        .slice(0).sort((a, b) => {
          return a.order - b.order
        })
      session.set({ ...response.importQuestions, questions: sessionQuestions })
      questions.set(sessionQuestions)
      notifications.add({ text: 'Copied questions into session', type: 'success' })
      show = false
      termId = ''
      courseId = ''
      importFromSessionId = ''
    } catch (error) {
      console.error(error)
      notifications.add({ text: 'Copying questions failed', type: 'danger' })
    } finally {
      loading = false
    }
  }
</script>

{#if show}
  <h2>Import questions</h2>
  {#if !termId}
    <label>Term</label>
    <select bind:value={termId}>
      <option>--</option>
      {#each $terms as term (term.id)}
        <option value={term.id}>{term.name}</option>
      {/each}
    </select>
  {:else if !courseId}
    <label>Course</label>
    <select bind:value={courseId}>
      <option>--</option>
      {#each termCourses as course (course.id)}
        <option value={course.id}>{course.name}</option>
      {/each}
    </select>
  {:else if !thisCourse.sessions}
    <p>Loading sessions...</p>
  {:else if thisCourse.sessions.length === 0}
    <p>There are no sessions for this course</p>
  {:else}
    <label>Session</label>
    <select bind:value={importFromSessionId}>
      <option>--</option>
      {#each thisCourse.sessions as session (session.id)}
        {#if session.id !== sessionId}
          <option value={session.id}>Lesson {session.order} {formatDate(session.startsAt)}</option>
        {/if}
      {/each}
    </select>
    {#if importFromSessionId}
      <ImportQuestionsList sessionId={importFromSessionId} />
      <button on:click={copyQuestions}>Import all questions</button>
    {/if}
  {/if}
  <button class="button-outline" on:click={() => { termId = ''; courseId = ''; show = false }}>Cancel</button>
{:else}
  <button class:is-loading={loading} disabled={loading} on:click={() => { show = true }}>Import questions from another session</button>
{/if}