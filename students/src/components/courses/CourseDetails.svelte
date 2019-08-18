<script>
  import { formatRelative } from 'date-fns'
  import { user } from '../../data/user'
  import Loading from '../Loading.svelte'

  export let course = {}

  $: isEnrolled = course.students && course.students.find(t => t.id === $user.id)
  $: teacherNames = course.teachers && course.teachers.map(teacher => teacher.name)
  const now = new Date().toJSON()
  $: past = course.sessions && course.sessions.filter(s => s.endsAt < now).sort((a, b) => b.startsAt.localeCompare(a.startsAt))
  $: future = course.sessions && course.sessions.filter(s => s.endsAt > now).sort((a, b) => a.startsAt.localeCompare(b.startsAt))

  const formatDate = (date) => {
    const string = formatRelative(new Date(date), new Date())
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
</script>

<style>
  li {
    list-style: none;
  }

  dl {
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: [key] auto [value] auto;
    grid-template-rows: auto;
    justify-content: start;
  }

  dl dt {
    grid-column: key;
    justify-self: start;
    font-weight: bold;
  }

  dl dd {
    grid-column: value;
    justify-self: start;
  }
</style>

<svelte:head>
  <title>{course.name}</title>
</svelte:head>

<h1>{course.name}</h1>

{#if course.teachers && course.students}
  <p>You are{!isEnrolled ? "n't" : ''} enrolled in this class.</p>
{:else}
  <Loading what="course enrollment"/>
{/if}


<div class="course-details">
  {#if course.teachers && course.students}
  <dl>
    <dt>Teacher(s):</dt>
    <dd>
      {teacherNames.length > 0 ? teacherNames.join(', ') : 'none'}
    </dd>
    <dt>Students:</dt>
    <dd>{course.students.length}</dd>
  </dl>
  {/if}

  {#if course.sessions}

    {#if past.length > 0}
      <section class="sessions">
        <h3>Past sessions</h3>
        {#each past as session (session.id)}
          <li>
            <a href="#/session/{session.id}">
              {session.order}. {formatDate(session.startsAt)}
            </a>
          </li>
        {/each}
      </section>
    {/if}
    
  {:else}
    <Loading what="course sessions" />
  {/if}
</div>