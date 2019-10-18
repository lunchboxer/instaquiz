<script>
  import { every15Seconds, time, imminentSession, nowSession, activeSession } from '../../data/stores'

  export let sessions

  $: soon = new Date($time.getTime() + 10 * 6e4)
  // keep checking if there is a session currently on
  $: {
    nowSession.set(
      sessions.find(
        s => s.startsAt <= $time.toJSON() && s.endsAt >= $time.toJSON()
      )
    )
  }

  $: {
    imminentSession.set(
      sessions.find(
        s => s.startsAt < soon.toJSON() && s.startsAt > $time.toJSON()
      )
    )
  }
  $: if ($nowSession && !$activeSession) activeSession.set($nowSession)

  // also update the upcoming sessions every 15 seconds
  $: in24Hours = new Date($every15Seconds.getTime() + 24 * 3.6e6)
  $: todaySessions = sessions.filter(s => {
    return (
      s.startsAt > $every15Seconds.toJSON() && s.endsAt < in24Hours.toJSON()
    )
  })
</script>