async function parse(response) {
  if (response.status === 204 || response.statusText === 'No Content') {
    return
  }

  const text = await response.text()
  let data
  try {
    data = JSON.parse(text)
  } catch (e) {
    console.error(e)
    throw { response, error: e } // eslint-disable-line
  }
  if (response.ok) {
    return data
  }
  throw { response, error: data } // eslint-disable-line
}

export async function fetchWithToken(input, token) {
  const response = await fetch(input, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
  return parse(response)
}
