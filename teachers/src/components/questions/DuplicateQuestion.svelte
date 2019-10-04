<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { QUESTIONS_BY_TEXT } from '../../data/queries'
  import { DELETE_RESPONSE } from '../../data/mutations'
  import QuestionResults from './QuestionResults.svelte'
  import Loading from '../Loading.svelte'
  import { notifications } from '../notifications'

  export let params = {}
  let questions
  let allAnswers

  const text = (decodeURI(params.text))

  onMount(async () => {
    if (!text) return
    const response = await request(QUESTIONS_BY_TEXT, { text })
    questions = response.questions
    allAnswers = mergeQuestions(questions)
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

  const findDuplicateResponses = questions => {
    // comb through all responses find which have same student and same session,
    // questions is already grouped into same session
    // next flatten responses
    questions.forEach(question => {
      const allResponses = question.answers.flatMap(a => a.responses)
      console.log(allResponses)
    })

    // const duplicates = {}
    // questions.forEach(question => {
    //   const studentsWhoHaveResponded = {}
    //   question.answers.forEach(answer => {
    //     answer.responses.forEach(response => {
    //       if (!studentsWhoHaveResponded[response.student.id]) {
    //         studentsWhoHaveResponded[response.student.id] = [response]
    //       } else {
    //         studentsWhoHaveResponded[response.student.id].push(response)
    //         if (duplicates[response.student.id]) {
    //           duplicates[response.student.id].push(response)
    //         } else {
    //           duplicates[response.student.id] = studentsWhoHaveResponded[response.student.id]
    //         }
    //       }
    //     })
    //   })
    // })
    // const duplicatesList = []
    // for (const student in duplicates) {
    //   const responses = duplicates[student].sort((a, b) => {
    //     return b.createdAt.localeCompare(a.createdAt)
    //   })
    //   duplicatesList.push({ studentId: student, responses })
    // }
    // return duplicatesList
  }

  $: duplicateResponses = questions && findDuplicateResponses(questions)

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
    {#each duplicateResponses as dupe (dupe.studentId)}
      <li>Student: {dupe.studentId}
        <ul>
          {#each dupe.responses as response, index (response.id)}
            <li>{response.id} - {response.createdAt} sessionId: {response.session.id}, answer: {response.answer.text}
              {#if index !== 0}
                <button class="button-clear" on:click={() => remove(response.id)}>delete</button>
              {/if}
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  {/if}
{:else}
  <Loading what="question"/>
{/if}