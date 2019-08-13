<script>
  import Modal from '../Modal.svelte'
  import { mutate } from 'svelte-apollo'
  import CourseForm from './CourseForm.svelte'
  import { notifications } from '../notifications'
  import { CREATE_COURSE } from '../../data/mutations'
  import { TERMS_AND_ALL } from '../../data/queries'
  import { client } from '../../data/apollo'

  let errors = ''
  let open = false
  let loading = false
  export let termId = ''

  const reset = () => {
    errors = ''
    open = false
  }

  const save = async ({ detail }) => {
    loading = true
    try {
      await mutate(client, {
        mutation: CREATE_COURSE,
        variables: { ...detail },
        refetchQueries: [{ query: TERMS_AND_ALL }]
        // update: (cache, { data: { createCourse } }) => {
        //   const data = cache.readQuery({ query: TERMS_AND_ALL })
        //   const index = data.terms.findIndex(t => t.id === createCourse.term.id)
        //   data.terms[index].courses.push({ ...createCourse, __typename: 'Course' })
        //   console.log(data.terms[index].courses)
        //   client.writeQuery({ query: TERMS_AND_ALL, data })
        // }
      })
      // const { terms } = client.readQuery({ query: TERMS_AND_ALL })
      // const index = terms.findIndex(t => t.id === response.data.createCourse.term.id)
      // terms[index].courses.push({ ...response.data.createCourse, __typename: 'Course' })
      // restore(client, TERMS_AND_ALL, { terms })
      // termsCache.refetch()
      notifications.add({ text: `Saved new course '${detail.name}'`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Could not save new course.',
        type: 'danger'
      })
    } finally {
      loading = false
    }
  }
</script>

<style>
  button i {
    margin-right: 0.5rem;
  }

  button {
    margin: 1rem 0;
  }
</style>

<button class="button" on:click={() => { open = true }}>
  <i class="fas fa-plus"></i>Add a course
</button>
<Modal bind:open>
  <CourseForm on:reset={reset} on:submit={save} {errors} {termId} {loading} />
</Modal>