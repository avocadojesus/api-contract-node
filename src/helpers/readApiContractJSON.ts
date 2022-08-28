import fs from 'fs'
import path from 'path'
import log from './log'
import { JSONFileNotFound, InvalidJSON } from '../exceptions/parse-json'

export default function readApiContractJSON(endpointJSONPath?: string) {
  const apiContractJSONPath = endpointJSONPath ||
    process.env.API_CONTRACT_PATH ||
    path.join(__dirname, '..', '..', '..', '..', '..', 'api-contract.json')

  log(`extracting api-contract.json file... at ${apiContractJSONPath}`)

  const results = fs.readFileSync(apiContractJSONPath)?.toString()
  if (!results) throw new JSONFileNotFound(apiContractJSONPath)

  let endpoints: { [key: string]: any }
  try {
    endpoints = JSON.parse(results)
  } catch (error) {
    throw new InvalidJSON(apiContractJSONPath, error as Error)
  }

  return endpoints
}
