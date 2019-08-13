<script>
  export let answer
  export let responses
  export let totalResponses

  $: percentage = responses.length === 0 || !totalResponses ? 0
    : parseInt((responses.length / totalResponses) * 100)
</script>

<li>
  <strong>{answer.text}</strong>
  {#if responses.length > 0}
  {responses.length} votes ({percentage}%)
  {/if}
</li>