import fs from 'fs'

export default function readApiContractJSON() {
  const apiContractJSONPath = process.env.API_CONTRACT_PATH || __dirname + '/../../../../api-contract.json'
  console.log(`extracting api-contract.json file... at ${apiContractJSONPath}`)

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
