<script>
  import { formatRelative } from 'date-fns'
  import { pop } from 'svelte-spa-router'
  import { auth } from '../../data/auth'
  import AddTeacherToCourse from './AddTeacherToCourse.svelte'
  import RemoveTeacherFromCourse from './RemoveTeacherFromCourse.svelte'
  import DeleteCourse from './DeleteCourse.svelte'
  import AddSession from '../sessions/AddSession.svelte'

  export let course

  $: isCourseTeacher = course.teachers.find(t => t.id === $auth.id)
  $: isEnrolled = course.students.find(t => t.id === $auth.id)
  $: teacherNames = course.teachers.map(teacher => {
    return $auth.id === teacher.id ? 'You' : teacher.name
  })
  const now = new Date().toJSON()
  $: past = course.sessions.filter(s => s.endsAt < now).sort((a, b) => b.startsAt.localeCompare(a.startsAt))
  $: future = course.sessions.filter(s => s.endsAt > now).sort((a, b) => a.startsAt.localeCompare(b.startsAt))

  const formatDate = (date) => {
    const string = formatRelative(new Date(date), new Date())
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
</script>

<style>
  .subtitle span {
    margin-right: 0.5rem;
  }

  .course-details {
    padding: 1rem;
  }

  .buttons {
    margin-top: 0.5rem;
  }

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

  .sessions {
    margin: 2rem 0 1rem 0;
  }
</style>

<svelte:head>
  <title>{course.name}</title>
</svelte:head>

<h1 class="title is-3">{course.name}</h1>
<p class="subtitle">
  {#if $auth.role === 'Teacher'}
      <span>You are{!isCourseTeacher ? "n't" : ''} a teacher for this class.</span>
    {#if !isCourseTeacher}
      <AddTeacherToCourse user={$auth.id} {course} />
    {:else}
      <RemoveTeacherFromCourse user={$auth.id} {course} />
    {/if}
  {:else}
    You are{!isEnrolled ? "n't" : ''} enrolled in this class.
  {/if}
</p>


<div class="course-details">
  <dl>
    <dt>Teacher(s):</dt>
    <dd>
      {teacherNames.length > 0 ? teacherNames.join(', ') : 'none'}
    </dd>
    <dt>Students:</dt>
    <dd>{course.students.length}</dd>
  </dl>

  {#if $auth.role === 'Teacher'}
    <div class="sessions">
      <h3 class="title is-5">Current and future sessions</h3>
      {#if future.length > 0}
        {#each future as session (session.id)}
          <li>
            <a href="#/session/{session.id}">
              {session.order}. {formatDate(session.startsAt)}
            </a>
          </li>
        {/each}
      {/if}
      <AddSession courseId={course.id} />
    </div>
  {/if}  

  {#if past.length > 0}
    <div class="sessions">
      <h3 class="title is-5">Past sessions</h3>
      {#each past as session (session.id)}
        <li>
          <a href="#/session/{session.id}">
            {session.order}. {formatDate(session.startsAt)}
          </a>
        </li>
      {/each}
    </div>
  {/if}

  <div class="buttons">
    {#if $auth.role === 'Teacher'}
        <!-- Can't be deleted if it has session connection -->
      {#if !course.sessions || course.sessions.length === 0}
        <DeleteCourse {course} on:delete={() => pop('/')} />
      {/if}
   
    {/if}
  </div>
  
</div>