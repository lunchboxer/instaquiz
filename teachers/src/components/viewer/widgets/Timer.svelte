<script>
  import { time } from '../../dashboard/stores'
  import { fade } from 'svelte/transition'

  export let seconds = 0
  let endTime

  $: if (seconds > 0) {
    const now = new Date()
    endTime = new Date(now.valueOf() + seconds * 1000)
  }

  const leftPad = number => number.toString().length === 1 ? '0' + number : number

  const formatDistance = (now, end) => {
    const timeDiff = end.getTime() - now.getTime()
    const diffHours = Math.floor((timeDiff % 86400000) / 3600000)
    const diffMinutes = Math.floor(((timeDiff % 86400000) % 3600000) / 60000)
    const diffSeconds = Math.floor((((timeDiff % 86400000) % 3600000) % 60000 / 1000))
    return `${leftPad(diffHours)}:${leftPad(diffMinutes)}:${leftPad(diffSeconds)}`
  }

  $: timeLeft = endTime && endTime > $time && formatDistance($time, endTime)
</script>

<style>
  section.timer {
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
    margin: 0;
    padding: 0;
  }

  .timer-text {
    background: rgba(0, 0, 0, 0.7);
    padding: 2rem;
  }

  .timer-text p {
    margin: 0;
    padding: 0;
    font-size: 6rem;
  }
</style>

<section class="timer" transition:fade>
  <div class="timer-text">
    {#if timeLeft}
    <p>{timeLeft} remaining</p>
  {/if}
  </div>

</section>