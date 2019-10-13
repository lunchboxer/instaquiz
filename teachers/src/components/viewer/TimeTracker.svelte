<script>
  import { time } from '../dashboard/stores'
  import { notifications } from '../notifications'

  export let endsAt = ''

  const alert = new Audio('sounds/zapsplat_multimedia_game_sound_mallet_notifiy_exclamation_008_40869.mp3')
  $: minutesLeft = $time && endsAt && Math.ceil((new Date(endsAt) - $time) / 60000)
  $: if ([10, 5, 1].includes(minutesLeft)) {
    alert.play()
    notifications.add({
      text: `Class ends in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}`
    })
  }
</script>