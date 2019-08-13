<script>
  export let questions
</script>

<style>
  li {
    list-style-type: none;
    margin: 1rem 0;
  }
</style>

{#if questions && questions.length > 0}
  {#each questions as question (question.id)}
    <li>
      {question.order + 1}. {question.text}
    </li>
  {/each}
{/if}