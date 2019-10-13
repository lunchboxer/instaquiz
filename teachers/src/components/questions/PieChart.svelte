<script>
  export let data

  export let colors

  let cumulativePercent = 0

  const getCoordinatesForPercent = percent => {
    const x = Math.cos(2 * Math.PI * percent)
    const y = Math.sin(2 * Math.PI * percent)
    return [x, y]
  }

  const makeSlice = slice => {
    const [startX, startY] = getCoordinatesForPercent(cumulativePercent)
    cumulativePercent += slice.portion
    const [endX, endY] = getCoordinatesForPercent(cumulativePercent)
    const largeArcFlag = slice.portion > 0.5 ? 1 : 0
    return `M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`
  }
</script>

<style>
  svg {
    width: 50%;
    height: 50%;
    max-height: 400px;
    max-width: 400px;
  }
</style>

<svg viewBox="-1 -1 2 2" style="transform: rotate(-90deg)" xmlns="http://www.w3.org/2000/svg">
  <path fill="#222" d="M 1 0 A 1 1 0 1 1 1 -2.4492935982947064e-16 L 0 0"></path>
  {#each data as item, index}
    <path fill={colors[index]} d={makeSlice(item)} />
  {/each}
</svg>