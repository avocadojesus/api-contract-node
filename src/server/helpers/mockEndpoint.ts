export default function mockEndpoint(httpMethod: string, path: string, payload: {[key: string]: any}) {
  process.env.API_CONTRACT_MOCKS ||= '{}'
  const json = JSON.parse(process.env.API_CONTRACT_MOCKS)

  json[`${httpMethod.toUpperCase()}:${path}`] = payload

  process.env.API_CONTRACT_MOCKS = JSON.stringify(json)
}
