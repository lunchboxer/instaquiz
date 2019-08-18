<script>
  import { user } from '../../data/user'
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

{#if !currentTerm}
  <p>There is no term currently in session.</p>
{:else}

  <section class="term">

    {#if currentTerm.courses}
      <h2>Current term: {currentTerm.name} </h2>
      <CategorizedCourseList courses={currentTerm.courses} />
      <AddCourse termId={currentTerm.id} />
    {/if} <!-- currentTerm.courses -->

  </section>

{/if} <!-- !currentTerm -->

  {#if nextTerm}

    <section class="term">
      {#if nextTerm.courses}
        <h2>Next term: {nextTerm.name}</h2>
        <CategorizedCourseList courses={nextTerm.courses} />
        <AddCourse termId={nextTerm.id} />
      {/if} <!-- nextTerm.courses -->
    </section>

  {/if} <!-- !nextTerm -->

  {#each otherTerms as term (term.id)}
    <section class="term">
      <h2>{term.name}</h2>
      {#if term.courses && term.courses.length > 0}
        <CategorizedCourseList courses={term.courses} />
      {/if}
      <AddCourse termId={term.id} />
    </section>
  {/each}
