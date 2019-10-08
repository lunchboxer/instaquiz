<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { ws } from '../../data/ws-client'
  import { CALL_SUBSCRIPTION } from '../../data/queries'

  export let session
  let call

  const alert = new Audio('sounds/zapsplat_multimedia_game_sound_mallet_generic_018_40859.mp3')

  onMount(() => {
    const subscription = ws.request({
      query: CALL_SUBSCRIPTION,
      variables: { sessionId: session.id }
    })
      .subscribe({
        next ({ data }) {
          if (data) {
            call = data.calls
            alert.play()
            if (data.calls.evaluation) {
              setTimeout(() => {
                // we might have already replaced it
                if (data.calls.id === call.id) call = null
              }, 4000)
            }
          }
        }
      })
    return () => subscription && subscription.unsubscribe()
  })
</script>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 40;
    bottom: 0;
    left: 0;
    right: 0;
    top: 5rem;
    width: 100%;
    height: calc(100% - 5rem);
    background: rgba(0, 0, 0, 0.7);
    margin: 0;
    padding: 0;
  }

  h1 {
    font-size: 6rem;
  }

  .student-info {
    text-align: center;
  }

  svg {
    width: 180px;
    height: 180px;
  }
</style>

{#if call}
  
  <div transition:fade>
    <section class="student-info">
      <h1>{call.student.name}</h1>
      <p>#{call.student.username}</p>
      {#if call.evaluation === 'Fail'}
        <svg in:fade xmlns="http://www.w3.org/2000/svg" fill="#ff2222" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><circle cx="15.5" cy="9.5" r="1.5"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-6c-2.33 0-4.32 1.45-5.12 3.5h1.67c.69-1.19 1.97-2 3.45-2s2.75.81 3.45 2h1.67c-.8-2.05-2.79-3.5-5.12-3.5z"/></svg>
      {/if}
      {#if call.evaluation === 'OK'}
        <svg in:fade xmlns="http://www.w3.org/2000/svg" fill="yellow" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><circle cx="15.5" cy="9.5" r="1.5"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-4c-.73 0-1.38-.18-1.96-.52-.12.14-.86.98-1.01 1.15.86.55 1.87.87 2.97.87 1.11 0 2.12-.33 2.98-.88-.97-1.09-.01-.02-1.01-1.15-.59.35-1.24.53-1.97.53z"/></svg>
      {/if}
      {#if call.evaluation === 'Good'}
        <svg in:fade xmlns="http://www.w3.org/2000/svg" fill="#22ff22" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><circle cx="15.5" cy="9.5" r="1.5"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-6c.78 2.34 2.72 4 5 4s4.22-1.66 5-4H7z"/></svg>
      {/if}
      {#if call.evaluation === 'Skip'}
        <svg in:fade xmlns="http://www.w3.org/2000/svg" fill="#777777" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
      {/if}
      {#if !call.evaluation}
        <svg in:fade fill="white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/></svg>
        <p>It's your turn.</p>
      {:else}
        <p>{call.evaluation}<p>
      {/if}
    </section>
  </div>
    
{/if}