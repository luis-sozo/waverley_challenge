export const apiSimulatedPost = async (path, params) => {
  const response = await fetch(path, {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    ...params
  })

  if (response.status >= 200 && response.status < 300) {
    const data = await response.json()
    // Due to the response is simulated data variable is empty, in the next line we are settings default values to show as response
    const { originalText = params.body.summarization, summarizedLength = params.body.summarizationLength, summarizedText = 'This text comes from the backend', confidenceScore = 'This Score comes from backend' } = data

    return {
      originalText,
      summarizedText,
      summarizedLength,
      confidenceScore

    }
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`)
    error.status = response.statusText
    error.response = response
    throw error
  }
}
