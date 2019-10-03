<script>
  export let id
  export let message

  $: text = !message || typeof message === 'string' ? message : message.text
  $: type = !message || typeof message === 'string' ? 'info' : message.type
</script>

<style>
  .notification {
    padding: 1rem 2rem;
    position: relative;
    margin: 0.5rem 2rem;
    border-radius: 8px;
    font-weight: 400;
    font-size: 2rem;
    background-color: rgba(50, 50, 50, 0.8);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (min-width: 600px) {
    .notification {
      width: 600px;
    }
    
  }
  svg {
    height: 2.6rem;
    width: 2.6rem;
    margin: 1rem;
    fill: #ddd;
  }

  .success {
    color:#23e160;
  }

  .danger {
    color: #ff4260;
  }

  .warning {
    color:#ffdd57;
  }
</style>


<div class="notification {type}">
  {#if type === 'success'}
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
  {/if}
  {#if type === 'danger'}
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/></svg>
  {/if}
  {#if type === 'warning'}
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
  {/if}
  <span>{text}</span>
</div>