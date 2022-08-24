import fs from 'fs'
import path from 'path'

export default function readApiContractJSON(endpointJSONPath?: string) {
  const apiContractJSONPath = endpointJSONPath ||
    process.env.API_CONTRACT_PATH ||
    __dirname + '/../../../../api-contract.json'
    // path.join(__dirname, '..', '..', '..', '..', 'api-contract.json')

  if (process.env.NODE_ENV !== 'test') console.log(`extracting api-contract.json file... at ${apiContractJSONPath}`)

  const results = fs.readFileSync(apiContractJSONPath)?.toString()
  if (!results) throw 'api-contract.json file was not found. looked at: ' + __dirname + '/' + apiContractJSONPath

  let endpoints: { [key: string]: any }
  try {
    endpoints = JSON.parse(results)
  } catch (error) {
    throw `Failed to parse JSON for api-contract.json file. Error: ${error}`
  }

  return endpoints
}
