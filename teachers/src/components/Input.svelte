<script>
  let input
  export let value
  export let showDescription = false
  export let label = ''
  let error = false
  export let required = false
  export let pattern = '^.+$'
  export let minlength = 1
  export let maxlength = 100
  export let type = 'text'
  export let description = ''
  export let width = '40rem'
  export let min = null
  export let max = null
  export let rightIcon = null
  export let leftIcon = null
  export let placeholder = ''

  $: name = label.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase())
  $: descriptionId = `description${name}`

  function checkValidity () {
    error =
      !input.validity.valid && input.validationMessage
        ? input.validationMessage
        : ''
  }
</script>

<style>
  input {
    max-width: 40rem;
  }

  .input-error {
    font-size: 1.2rem;
    color: #ff2240;
  }
</style>

<div class="field">
  <label class="label">{label} {#if description}
    <p class="help is-info" id="{descriptionId}">{description}</p>
    {/if}
  </label>
  <div class="field-body">
    <div
      class="control"
      class:has-icons-left="{leftIcon}"
      class:has-icons-right="{rightIcon}"
    >
      {#if type === 'text'}
      <input
        bind:this="{input}"
        {name}
        class="input"
        bind:value
        class:error="{error}"
        type="text"
        {pattern}
        {minlength}
        {maxlength}
        {required}
        aria-describedby="{descriptionId}"
        on:input="{checkValidity}"
        on:invalid|preventDefault="{checkValidity}"
        {placeholder}
      />
      {/if} 
      {#if type === 'password'}
      <input
        bind:this="{input}"
        {name}
        class="input"
        bind:value
        class:error="{error}"
        type="password"
        {pattern}
        {minlength}
        {maxlength}
        {required}
        aria-describedby="{descriptionId}"
        on:input="{checkValidity}"
        on:invalid|preventDefault="{checkValidity}"
        {placeholder}
      />
      {/if} 
      {#if type === 'date'}
      <input
        bind:this="{input}"
        {name}
        class="input"
        bind:value
        class:error="{error}"
        type="date"
        pattern="^[0-9]{4}-(1[0-2]|0[1-9])-([1-3][0-9]|0[1-9])$"
        {required}
        {min}
        {max}
        aria-describedby="{descriptionId}"
        on:input="{checkValidity}"
        on:invalid|preventDefault="{checkValidity}"
      />
      {/if} 
      {#if type === 'datetime-local'}
      <input
        bind:this="{input}"
        {name}
        class="input"
        bind:value
        class:error="{error}"
        type="datetime-local"
        {required}
        {min}
        {max}
        aria-describedby="{descriptionId}"
        on:input="{checkValidity}"
        on:invalid|preventDefault="{checkValidity}"
      />
      {/if} 
      {#if type === 'number'}
      <input
        bind:this="{input}"
        {name}
        class="input"
        bind:value
        class:error="{error}"
        type="number"
        {required}
        {max}
        {min}
        aria-describedby="{descriptionId}"
        on:input="{checkValidity}"
        on:invalid|preventDefault="{checkValidity}"
      />
      {/if}
     {#if error}
      <p class="input-error">{error}</p>
      {/if}
    </div>
  </div>
</div>