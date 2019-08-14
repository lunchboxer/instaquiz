<script>
  import { auth } from '../../data/auth'
  import AddCourse from '../courses/AddCourse.svelte'
  import CategorizedCourseList from '../courses/CategorizedCourseList.svelte'

  export let terms

  const now = new Date().toJSON()

  $: currentTerm = terms && terms.find(t => t.startDate < now && t.endDate > now)
  $: nextTerm = terms && terms.find(t => t.startDate > now)
  $: otherTerms = terms && terms.filter(t => {
    if (currentTerm && t.id === currentTerm.id) return false
    if (nextTerm && t.id === nextTerm.id) return false
    return true
  })
</script>

<style>
  section.term {
    margin: 2rem 1rem;
  }
</style>

{#if !currentTerm}
  <p>There is no term currently in session.</p>
{:else}

  <section class="term">

    {#if currentTerm.courses}
      <h2 class="title is-4">Current term: {currentTerm.name} </h2>
      <CategorizedCourseList courses={currentTerm.courses} />
      {#if $auth.role === 'Teacher'}
        <AddCourse termId={currentTerm.id} />
      {/if}
    {/if} <!-- currentTerm.courses -->

  </section>

{/if} <!-- !currentTerm -->

{#if $auth.role === 'Teacher'}

  {#if nextTerm}

    <section class="term">
      {#if nextTerm.courses}
        <h2 class="title is-4">Next term: {nextTerm.name}</h2>
        <CategorizedCourseList courses={nextTerm.courses} />
        <AddCourse termId={nextTerm.id} />
      {/if} <!-- nextTerm.courses -->
    </section>

  {/if} <!-- !nextTerm -->

  {#each otherTerms as term (term.id)}
    <section class="term">
      <h2 class="title is-4">{term.name}</h2>
      {#if term.courses && term.courses.length > 0}
        <CategorizedCourseList courses={term.courses} />
      {/if}
      <AddCourse termId={term.id} />
    </section>
  {/each}
{/if} <!-- $auth.role === 'Teacher -->

{#if $auth.role === 'Student'}
  <a href="#/join-course" class="button">Join a course</a>
{/if}