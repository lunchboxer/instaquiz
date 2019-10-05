<script>
  import { request } from '../../data/fetch-client'
  import { QUESTIONS_BY_TEXT } from '../../data/queries'
  import QuestionResults from './QuestionResults.svelte'
  import Loading from '../Loading.svelte'
  import SwipeNav from '../SwipeNav.svelte'
  import { duplicateQuestions } from './data'

  export let params = {}
  let questions
  let allAnswers

  if (!$duplicateQuestions) duplicateQuestions.get()

  const getQuestion = async text => {
    if (!text) return
    questions = null
    allAnswers = null
    const response = await request(QUESTIONS_BY_TEXT, { text })
    questions = response.questions
    allAnswers = mergeQuestions(questions)
  }

  $: getQuestion(decodeURI(params.text))

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

  $: thisQuestionIndex = questions && $duplicateQuestions && $duplicateQuestions.findIndex(q => q.text === questions[0].text)
  $: nextQuestion = thisQuestionIndex >= 0 && $duplicateQuestions && $duplicateQuestions[thisQuestionIndex + 1]
  $: previousQuestion = thisQuestionIndex >= 0 && $duplicateQuestions && $duplicateQuestions[thisQuestionIndex - 1]
</script>

<style>
  .in-a-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .details {
    width: 100%;
  }

  .previous,
  .next {
    padding: 0;
    margin: 0;
    width: 48px;
    height: 48px;
  }

  .previous a svg,
  .next a svg {
    fill: #ccc;
    width: 48px;
    height: 48px;
    margin: 0;
    padding: 0;
  }

  @media (hover: none) and (pointer: coarse) {

    .previous,
    .next {
      display: none;
    }
  }
</style>

<h1>Duplicate question</h1>

{#if questions}

  <SwipeNav 
    next={nextQuestion && `/duplicate-question/${encodeURI(nextQuestion.text)}`}
    previous={previousQuestion && `/duplicate-question/${encodeURI(previousQuestion.text)}`} />

  <h3>{questions[0].text}</h3>
  <p>Asked {timesAsked(questions)} times. Answered by {uniqueStudentCount(allAnswers)} students.</p>

  <div class="in-a-row">
    <div class="previous">
      {#if previousQuestion}
        <a  href="#/duplicate-question/{encodeURI(previousQuestion.text)}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
        </a>
      {/if}
    </div>
  
    <div class="details">
      <QuestionResults answers={allAnswers} />
    </div>
   
    <div class="next">
      {#if nextQuestion}
        <a href="#/duplicate-question/{encodeURI(nextQuestion.text)}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
        </a>
      {/if}
    </div>
  </div>

{:else}
  <Loading what="question"/>
{/if}