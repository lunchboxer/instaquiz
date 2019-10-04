<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { QUESTIONS_BY_TEXT } from '../../data/queries'
  import QuestionResults from './QuestionResults.svelte'
  import Loading from '../Loading.svelte'

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
      if (uniqueStudents[response.student.id]) {
        count++
      } else {
        uniqueStudents[response.student.id] = 1
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
</script>

<h1>Duplicate question</h1>

{#if questions}
  <h3>{questions[0].text}</h3>
  <p>Asked {timesAsked(questions)} times. Answered by {uniqueStudentCount(allAnswers)} students.</p>


  <QuestionResults answers={allAnswers} />
{:else}
  <Loading what="question"/>
{/if}