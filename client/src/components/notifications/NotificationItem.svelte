<script>
  import { notifications } from './data'

  export let id
  export let message

  $: text = !message || typeof message === 'string' ? message : message.text
  $: type = !message || typeof message === 'string' ? 'info' : message.type

  const remove = () => notifications.remove(id)
</script>

<style>
  .notification {
    padding: 1.25rem 2.5rem 1.5rem 1.5rem;
    position: relative;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    padding-right: 28px;
    font-weight: 400;
  }

  .close {
    background-color: rgba(10, 10, 10, .2);
    border: none;
    border-radius: 290486px;
    cursor: pointer;
    pointer-events: auto;
    display: inline-block;
    flex-grow: 0;
    flex-shrink: 0;
    font-size: 0;
    height: 20px;
    max-height: 20px;
    max-width: 20px;
    min-height: 20px;
    min-width: 20px;
    outline: 0;
    position: absolute;
    right: 0.8rem;
    top: 0.8rem;
    vertical-align: top;
    width: 20px
  }

  .close::after,
  .close::before {
    background-color: #fff;
    content: "";
    display: block;
    left: 50%;
    position: absolute;
    top: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%) rotate(45deg);
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
    -webkit-transform-origin: center center;
    transform-origin: center center
  }

  .close::before {
    height: 2px;
    width: 50%
  }

  .close::after {
    height: 50%;
    width: 2px
  }

  .close:focus,
  .close:hover {
    background-color: rgba(10, 10, 10, .3)
  }

  .close:active {
    background-color: rgba(10, 10, 10, .4)
  }

  span {
    margin-right: 1rem;
  }
</style>


<div class="notification {type}">
  <button class="close" on:click={remove}></button>
  <span>{text}</span>
</div>