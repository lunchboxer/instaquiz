<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { QUESTIONS_BY_TEXT, RESPONSES_SAME_QUESTION_TEXT } from '../../data/queries'
  import { DELETE_RESPONSE } from '../../data/mutations'
  import QuestionResults from './QuestionResults.svelte'
  import Loading from '../Loading.svelte'
  import { notifications } from '../notifications'

  export let params = {}
  let questions
  let allAnswers
  let allResponses

  const text = (decodeURI(params.text))

  onMount(async () => {
    if (!text) return
    const response = await request(QUESTIONS_BY_TEXT, { text })
    console.log(response.questions)
    questions = response.questions
    allAnswers = mergeQuestions(questions)
    const { responses } = await request(RESPONSES_SAME_QUESTION_TEXT, { text })
    allResponses = responses
  })

  const mergeQuestions = questions => {
    const answers = []
    questions.forEach(question => {
      question.answers.forEach(answer => {
        const index = answers.findIndex(a => a.text === answer.text)
        if (index === -1) {
          answers.push({ text: answer.text, responses: answer.responses })
        } else {
          answers[index].responses.push(...answer.responses)
        }
      })
    })
    return answers
  }

  const uniqueStudentCount = answers => {
    if (!answers || answers.length === 0) return
    // merge all the responses first
    const allResponses = answers.flatMap(answer => answer.responses)
    console.log(allResponses)
    // count the unique students
    const uniqueStudents = {}
    let count = 0
    allResponses.forEach(response => {
      if (!uniqueStudents[response.student.id]) {
        uniqueStudents[response.student.id] = 1
        count++
      }
    })
    return count
  }

  const timesAsked = questions => {
    return questions.reduce((asked, question) => {
      if (question.asked) asked += 1
      return asked
    }, 0)
  }

  const findDuplicateResponses = () => {
    // comb through all responses find which have same student and same session,

    // group by same student first
    const groupedByStudent = {}

    allResponses.forEach(response => {
      if (groupedByStudent[response.student.id]) {
        groupedByStudent[response.student.id].push(response)
      } else {
        groupedByStudent[response.student.id] = [response]
      }
    })

    const duplicates = []
    // then see if there are same session in a single students responses
    for (const student in groupedByStudent) {
      if (groupedByStudent[student].length < 2) return
      const bySession = {}
      groupedByStudent[student].forEach(response => {
        if (bySession[response.session.id]) {
          bySession[response.session.id].push(response)
        } else {
          bySession[response.session.id] = [response]
        }
      })
      for (const session in bySession) {
        if (bySession[session].length > 1) {
          duplicates.push(bySession[session])
        }
      }
    }
    return duplicates
  }

  $: duplicateResponses = allResponses && findDuplicateResponses()

  $: console.log(questions)
  const remove = async id => {
    try {
      await request(DELETE_RESPONSE, { id })
      notifications.add({ text: `removed response ${id}`, type: 'success' })
      questions = null
      allAnswers = null
      const response = await request(QUESTIONS_BY_TEXT, { text })
      questions = response.questions
      allAnswers = mergeQuestions(questions)
    } catch (error) {
      notifications.add({ text: `could not remove response ${id}`, type: 'danger' })
      console.error(error)
    }
  }
</script>

<style>
  ul {
    margin-top: 1rem;
    margin-left: 2rem;
  }
</style>

<h1>Duplicate question</h1>

{#if questions}
  <h3>{questions[0].text}</h3>
  <p>Asked {timesAsked(questions)} times. Answered by {uniqueStudentCount(allAnswers)} students.</p>


  <QuestionResults answers={allAnswers} />

  {#if duplicateResponses && duplicateResponses.length > 0}
    <h4>Duplicate responses</h4>
    {#each duplicateResponses as dupe}
      <li>Student: {dupe[0].student.Id}
        <ul>
          {#each dupe as response, index (response.id)}
            <li>{response.id} - {response.createdAt} sessionId: {response.session.id}, answer: {response.answer.text}
                <button class="button-clear" on:click={() => remove(response.id)}>delete</button>
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  {/if}
{:else}
  <Loading what="question"/>
{/if}