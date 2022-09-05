import { Express } from 'express'
import generateResponse from './generateResponse'
import readApiContractJSON from '../../helpers/readApiContractJSON'
import validateSchema from '../../helpers/validateSchema'
import ShouldNeverBeCalled from '../../exceptions/internal/should-never-be-called'
import { ApiContractOptions, HttpMethods } from '../../config'

export default function createRoutes(app: Express, endpointJSONPath?: string) {
  const endpoints = readApiContractJSON(endpointJSONPath)
  const config: ApiContractOptions = endpoints.config

  validateSchema(endpoints)

  Object
    .keys(endpoints)
    .forEach(endpointKey => {
      const [httpMethod] = endpointKey.split(':')
      const path = endpointKey.replace(new RegExp(`^${httpMethod}:`), '')

      switch(httpMethod) {
      case HttpMethods.Get:
        app.get(path, (req, res) => res.json(generateResponse(endpoints[endpointKey].payload_shape, config, req.params)))
        break

      case HttpMethods.Post:
        app.post(path, (req, res) => res.json(generateResponse(endpoints[endpointKey].payload_shape, config, req.params)))
        break

      case HttpMethods.Put:
        app.put(path, (req, res) => res.json(generateResponse(endpoints[endpointKey].payload_shape, config, req.params)))
        break

      case HttpMethods.Patch:
        app.patch(path, (req, res) => res.json(generateResponse(endpoints[endpointKey].payload_shape, config, req.params)))
        break

      case HttpMethods.Delete:
        app.delete(path, (req, res) => res.json(generateResponse(endpoints[endpointKey].payload_shape, config, req.params)))
        break

      default:
        if (httpMethod !== 'config')
          throw new ShouldNeverBeCalled(`Invalid HTTP method discovered in ${process.env.API_CONTRACT_PATH}: ${httpMethod}`)
      }
    })
}
