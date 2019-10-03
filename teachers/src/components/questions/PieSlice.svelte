<script>
  import { spring } from 'svelte/motion'

  export let shape
  export let color

  const endX = spring(0)
  const endY = spring(0)

  $: if (shape.endX) endX.set(shape.endX)
  $: if (shape.endY) endY.set(shape.endY)
</script>

<path fill={color} d={`${shape.d} ${$endX} ${$endY} L 0 0`} />