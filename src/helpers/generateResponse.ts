import generateValue from './generateValue'

export default function generateResponse(payloadShape: {[key: string]: any}) {
  const results: {[key: string]: any} = {}

  Object.keys(payloadShape).forEach(key => {
    if (typeof payloadShape[key] === 'object') {
      results[key] = generateResponse(payloadShape[key])

    } else {
      const val = generateValue(payloadShape[key])
      if (val === null) throw `unrecognized format passed for payload key: ${key}. Invalid format is: ${payloadShape[key]}`
      results[key] = val
    }
  })
  return results
}
