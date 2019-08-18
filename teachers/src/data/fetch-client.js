const fetch = window.fetch

const endpoint = process.env.API_ENDPOINT

export const request = async (query, variables) => {
  const coldToken = window.localStorage.getItem('token')
  const token = coldToken ? JSON.parse(coldToken) : null
  const body = typeof query === 'function'
    ? query(variables)
    : JSON.stringify({ query, variables })
  const response = await fetch(endpoint, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token || ''
    },
    body
  })
  const result = response && await response.json()
  if (response && response.ok && !result.errors && result.data) {
    return result.data
  } else {
    if (process.env.NODE_ENV === 'development') console.error(result)
    throw result.errors
  }
}
