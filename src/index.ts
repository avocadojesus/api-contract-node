import express, { Express } from 'express'
import fs from 'fs'
import generateResponse from './helpers/generateResponse'

const app: Express = express()
const port = process.env.API_CONTRACT_PORT || 4000
console.log("FROM TEST SERVER", __dirname)

const apiContractJSONPath = process.env.API_CONTRACT_PATH || __dirname + '/../../../../api-contract.json'
console.log(`extracting api-contract.json file... at ${apiContractJSONPath}`)
const results = fs.readFileSync(apiContractJSONPath)?.toString()

if (!results) {
  throw 'api-contract.json file was not found. looked at: ' + __dirname + '/' + apiContractJSONPath
}

let endpoints: {[key: string]: any}
try {
  endpoints = JSON.parse(results)
} catch (error) {
  throw(`Failed to parse JSON for api-contract.json file. Error: ${error}`)
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
    throw `Unrecognized HTTP method discovered in ${process.env.API_CONTRACT_PATH}: ${httpMethod}`
  }
})

app.listen(port, () => {
  console.log(`listening on the port ${port}...`)
})

