<script>
  import { formatRelative } from 'date-fns'
  import { user } from '../../data/user'
  import Loading from '../Loading.svelte'
  import AddTeacherToCourse from './AddTeacherToCourse.svelte'
  import RemoveTeacherFromCourse from './RemoveTeacherFromCourse.svelte'
  import AddSession from '../sessions/AddSession.svelte'
  import DeleteItem from '../DeleteItem.svelte'
  import { courses } from './data'

  export let course = {}
  let showDelete = false

  $: isCourseTeacher = course.teachers && course.teachers.find(t => t.id === $user.id)
  $: isEnrolled = course.students && course.students.find(t => t.id === $user.id)
  $: teacherNames = course.teachers && course.teachers.map(teacher => {
    return $user.id === teacher.id ? 'You' : teacher.name
  })
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
<p>
  <span>You are{!isCourseTeacher ? "n't" : ''} a teacher for this class.</span>
  {#if !isCourseTeacher}
    <AddTeacherToCourse courseId={course.id} />
  {:else}
    <RemoveTeacherFromCourse courseId={course.id} />
  {/if}
</p>
{:else}
  <Loading what="course enrollment"/>
{/if}


<div class="course-details">
  {#if course.teachers && course.students}
    <dl>
      <dt>Code:</dt>
      <dd>{course.code}</dd>

      <dt>Teacher(s):</dt>
      <dd>
        {teacherNames.length > 0 ? teacherNames.join(', ') : 'none'}
      </dd>
      
      <dt>Students:</dt>
      <dd>{course.students.length} <a href="#/course-students/{course.id}">view student list</a></dd>
    </dl>
  {/if}

  {#if course.sessions}
    <section class="sessions">
      <h3>Current and future sessions</h3>
      {#if future.length > 0}
        {#each future as session (session.id)}
          <li>
            <a href="#/session/{session.id}">
              {session.order}. {formatDate(session.startsAt)}
            </a>
          </li>
        {/each}
      {:else}
      <p>none</p>
      {/if}
      {#if isCourseTeacher}
        <AddSession courseId={course.id} />
      {/if}
    </section> 

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

  <div class="buttons">
    {#if isCourseTeacher}
        <!-- Can't be deleted if it has session connection -->
      {#if !course.sessions || course.sessions.length === 0}
        <button class="button button-outline" on:click={() => { showDelete = true }}>
          Delete course
        </button>
        <DeleteItem 
        id={course.id} 
        store={courses} 
        type="course" 
        name={course.name} 
        bind:open={showDelete} 
        next="/courses"/>
      {/if}
   
    {/if}
  </div>
  {:else}
    <Loading what="course sessions" />
  {/if}
</div>