<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'

  onMount(async () => {
    const response = request(SLIDESHOWS)
  })
</script>