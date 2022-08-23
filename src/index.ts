import express, { Express } from 'express'
import fs from 'fs'
import generateResponse from './helpers/generateResponse'

const app: Express = express()
const port = process.env.API_CONTRACT_PORT || 4000
console.log("FROM TEST SERVER", __dirname)

const endpointsPath = process.env.ENDPOINTS_PATH || '../../../../../endpoints.json'
console.log(`extracting endpoints.json file... at ${endpointsPath}`)
const results = fs.readFileSync(endpointsPath)?.toString()

if (!results) {
  throw 'endpoints.json file was not found. looked at: ' + __dirname + '/' + endpointsPath
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
  case 'GET':
    app.get(path, (_, res) => res.json(generateResponse(endpoints[endpointKey].payload_shape)))
    break

  case 'POST':
    app.post(path, (_, res) => res.json(generateResponse(endpoints[endpointKey].payload_shape)))
    break

  case 'PUT':
    app.put(path, (_, res) => res.json(generateResponse(endpoints[endpointKey].payload_shape)))
    break

  case 'PATCH':
    app.patch(path, (_, res) => res.json(generateResponse(endpoints[endpointKey].payload_shape)))
    break

  case 'DELETE':
    app.delete(path, (_, res) => res.json(generateResponse(endpoints[endpointKey].payload_shape)))
    break

  default:
    throw `Unrecognized HTTP method discovered in ${process.env.ENDPOINTS_PATH}: ${httpMethod}`
  }
})

app.listen(port, () => {
  console.log(`listening on the port ${port}...`)
})

