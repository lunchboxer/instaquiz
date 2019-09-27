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
    // destructuring assignment sets the two variables at once
    const [startX, startY] = getCoordinatesForPercent(cumulativePercent)

    // each slice starts where the last slice ended, so keep a cumulative percent
    cumulativePercent += slice.portion

    const [endX, endY] = getCoordinatesForPercent(cumulativePercent)

    // if the slice is more than 50%, take the large arc (the long way around)
    const largeArcFlag = slice.portion > 0.5 ? 1 : 0

    // create an array and join it just for code readability
    return [
      `M ${startX} ${startY}`, // Move
      `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
      'L 0 0' // Line
    ].join(' ')
  }
</script>

<style>
  svg {
    width: 50%;
    height: 50%;
    max-height: 450px;
    max-width: 450px;
  }
</style>

<svg viewBox="-1 -1 2 2" style="transform: rotate(-90deg)" xmlns="http://www.w3.org/2000/svg">
  <path fill="#222" d="M 1 0 A 1 1 0 1 1 1 -2.4492935982947064e-16 L 0 0"></path>
  {#each data as item, index}
    <path fill={colors[index]} d={makeSlice(item)} />
  {/each}
</svg>