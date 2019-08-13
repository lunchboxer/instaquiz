export function isObject (item) {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

// merge normalized data without deleting props not shown in new source
export const extend = (target, source) => {
  const output = Object.assign({}, target)
  Object.keys(source).forEach(itemId => {
    if (isObject(source[itemId])) {
      if (itemId in target) {
        output[itemId] = { ...target[itemId], ...source[itemId] }
      } else {
        output[itemId] = source[itemId]
      }
    }
  })
  return output
}
