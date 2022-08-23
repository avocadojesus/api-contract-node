import express, { Express } from 'express'
import fs from 'fs'
import generateResponse from './helpers/generateResponse'

const app: Express = express()
const port = process.env.PORT || 3000

if (!process.env.ENDPOINTS_PATH) {
  throw 'cannot start test api server without first setting path to endpoints.json (use ENDPOINTS_PATH env to set this)'
}

console.log('extracting endpoints.json file...')
const results = fs.readFileSync(process.env.ENDPOINTS_PATH)?.toString()

if (!results) {
  throw 'endpoints.json file was not found.'
}

let endpoints: {[key: string]: any}
try {
  endpoints = JSON.parse(results)
} catch (error) {
  throw(`Failed to parse JSON for endpoints.json file. Error: ${error}`)
}

Object.keys(endpoints).forEach(endpointKey => {
  const [httpMethod, path] = endpointKey.split(':')

  switch(httpMethod) {
  case 'POST':
    app.post(path, (_, res) => res.json(generateResponse(endpoints[endpointKey].payload_shape)))
    break

  case 'GET':
    app.get(path, (_, res) => res.json(generateResponse(endpoints[endpointKey].payload_shape)))
    break

  default:
    throw `Unrecognized HTTP method discovered in ${process.env.ENDPOINTS_PATH}: ${httpMethod}`
  }
})

app.listen(port, () => {
  console.log(`listening on the port ${port}...`)
})

