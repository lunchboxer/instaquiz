<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { ws } from '../../data/ws-client'
  import { request } from '../../data/fetch-client'
  import ViewerResponses from './ViewerResponses.svelte'
  import { students } from '../students/data'
  import { responses } from '../dashboard/stores'
  import CallWatcher from './CallWatcher.svelte'
  import { absences } from './stores'
  import AbsenceWatcher from './AbsenceWatcher.svelte'
  import { QUESTION_SUBSCRIPTION, ASKED_QUESTION } from '../../data/queries'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import ResponseWatcher from './ResponseWatcher.svelte'

  const progress = tweened(0, {
    duration: 400,
    easing: cubicOut
  })

  let question
  export let session

  onMount(async () => {
    students.getByCourse(session.course.id)
    responses.set()
    const { questions } = await request(ASKED_QUESTION, { sessionId: session.id })
    if (questions && questions.length > 0) question = questions[0]
    const subscription = ws.request({
      query: QUESTION_SUBSCRIPTION,
      variables: { sessionId: session.id }
    })
      .subscribe({
        next ({ data }) {
          if (data) {
            if (question.id !== data.questions.id) {
              responses.set([])
            }
            question = data.questions
          }
        }
      })
    return () => subscription && subscription.unsubscribe()
  })

  $: hasntAnswered = $responses && $absences && $students && $students.filter(s => {
    if ($absences.find(a => a.student.id === s.id)) return false
    return !$responses.find(r => r.student.id === s.id)
  })
  $: presentStudents = $absences && $students && $students.filter(s => !$absences.find(a => a.student.id === s.id))
  $: if (presentStudents) progress.set(hasntAnswered ? presentStudents.length - hasntAnswered.length : 0)
</script>

<style>
  .container {
    width: 100%;
    height: calc(100vh - 10rem);
    border: 1px solid #222;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }

  h1 {
    font-size: 6rem;
  }

  p {
    margin: 0;
    padding: 0;
  }

  progress {
    width: 90%;
    height: 8px;
    margin: 4rem;
  }

  progress[value] {
    -webkit-appearance: none;
    appearance: none;
    height: 4px;
  }

  progress[value]::-webkit-progress-bar {
    border: 1px solid var(--primary-color);
    background: transparent;
    height: 8px;
  }

  progress[value]::-webkit-progress-value {
    background-color: var(--primary-color);
  }
</style>

<AbsenceWatcher {session} />

<CallWatcher {session} />

{#if question}

  <ResponseWatcher {question} />
  
  <div class="container" transition:fade>
    <h1>{question.text}</h1>
    {#if hasntAnswered && $students}
      <progress value={$progress} max={presentStudents.length}></progress>
    {/if}
    {#if hasntAnswered && hasntAnswered.length > 0}
      <p>{hasntAnswered.length} students have not answered</p>
      {#if hasntAnswered.length < 10}
        {hasntAnswered.map(s => s.name).join(', ')}
      {/if}
    {/if}
    {#if question.publishResponses}
      <ViewerResponses {question} />
    {/if}
  </div>
  
{/if}