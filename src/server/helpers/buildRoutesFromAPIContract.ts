import { Express } from 'express'
import generateResponse from './generateResponse'
import readApiContractJSON from '../../helpers/readApiContractJSON'
import { ApiContractOptions } from '../../config'

export default function buildRoutesFromAPIContract(app: Express, endpointJSONPath?: string) {
  const endpoints = readApiContractJSON(endpointJSONPath)
  const config: ApiContractOptions = endpoints.config

  Object
    .keys(endpoints)
    .forEach(endpointKey => {
      const [httpMethod] = endpointKey.split(':')
      const path = endpointKey.replace(new RegExp(`^${httpMethod}:`), '')

      switch(httpMethod) {
      case 'GET':
        app.get(path, (_, res) => res.json(generateResponse(endpoints[endpointKey].payload_shape, config)))
        break

      case 'POST':
        app.post(path, (_, res) => res.json(generateResponse(endpoints[endpointKey].payload_shape, config)))
        break

      case 'PUT':
        app.put(path, (_, res) => res.json(generateResponse(endpoints[endpointKey].payload_shape, config)))
        break

      case 'PATCH':
        app.patch(path, (_, res) => res.json(generateResponse(endpoints[endpointKey].payload_shape, config)))
        break

      case 'DELETE':
        app.delete(path, (_, res) => res.json(generateResponse(endpoints[endpointKey].payload_shape, config)))
        break

      default:
        if (httpMethod !== 'config')
          throw `Unrecognized HTTP method discovered in ${process.env.API_CONTRACT_PATH}: ${httpMethod}`
      }
    })
}
