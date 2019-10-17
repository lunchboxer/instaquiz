<script>
  import { time } from '../../dashboard/stores'
  import { fade } from 'svelte/transition'
  import { notifications } from '../../notifications'

  export let seconds = 0

  let totalTimerString = ''
  let endTime
  let diffSeconds = 0
  let diffHours = 0
  let diffMinutes = 0

  const timesUpSound = new Audio('/sounds/zapsplat_multimedia_game_sound_mallet_positive_advance_001_40871.mp3')
  const leftPad = number => number.toString().length === 1 ? '0' + number : number

  const formatDistance = (now, end) => {
    const timeDiff = end.getTime() - now.getTime()
    diffHours = Math.floor((timeDiff % 86400000) / 3600000)
    diffMinutes = Math.floor(((timeDiff % 86400000) % 3600000) / 60000)
    diffSeconds = Math.floor((((timeDiff % 86400000) % 3600000) % 60000 / 1000))
    const timestring = []
    if (diffHours) timestring.push(diffHours + ' hours')
    if (diffMinutes) timestring.push(diffMinutes + ' minutes')
    if (diffSeconds) timestring.push(diffSeconds + ' seconds')
    return timestring.join('\n')
  }

  $: if (seconds > 0) {
    endTime = false
    const now = new Date()
    endTime = new Date(now.valueOf() + seconds * 1000)
    totalTimerString = formatDistance(now, endTime)
    notifications.add(`${totalTimerString} starts now!`)
    seconds = 1
  }

  $: timeLeft = endTime && endTime > $time && formatDistance($time, endTime)

  $: if (timeLeft === false) {
    timesUpSound.play()
    notifications.add(`${totalTimerString} is up!`)
  }
</script>

<style>
  section.timer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 40;
    left: 0;
    right: 0;
    top: 1rem;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .timer-text {
    background: rgba(0, 0, 0, 0.7);
    border-radius: 8px;
    text-align: center;
    padding: 0.5rem 1rem 0.5rem 1rem;
  }

  .timer-text p {
    margin: 0;
    padding: 0;
  }

  p.countdown {
    font-size: 3rem;
  }

  p.total {
    font-size: 2rem;
  }
</style>

{#if timeLeft}
  <section class="timer" transition:fade>
    <div class="timer-text">
   
      <p class="countdown">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>
        {#if diffHours > 0}{leftPad(diffHours)}:{/if}{leftPad(diffMinutes)}:{leftPad(diffSeconds)}
        remaining
      </p>
 
      <p class="total">out of {totalTimerString}<p>
    </div>
  </section>
{/if}