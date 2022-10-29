import { Express, Request, Response } from 'express'
import generateResponse from './generateResponse'
import readApiContractJSON from '../../helpers/readApiContractJSON'
import validateSchema from '../../helpers/validateSchema'
import ShouldNeverBeCalled from '../../exceptions/internal/should-never-be-called'
import { ApiContractOptions, EndpointConfig, HttpMethods } from '../../config'
import mockEndpoint from './mockEndpoint'

export default function createRoutes(app: Express, endpointJSONPath?: string) {
  const endpoints = readApiContractJSON(endpointJSONPath)
  const config: ApiContractOptions = endpoints.config

  validateSchema(endpoints)

  app.post('/__api_contract_internal/mock_endpoint', (req, res) => {
    mockEndpoint(req.body.httpMethod, req.body.path, req.body.payload)
    res.json({})
  })

  Object
    .keys(endpoints)
    .forEach(endpointKey => {
      const [httpMethod] = endpointKey.split(':')
      const path = endpointKey.replace(new RegExp(`^${httpMethod}:`), '')
      const endpointConfig: EndpointConfig = endpoints[endpointKey]
      const handler = (req: Request, res: Response) =>
        res
          .status(parseInt(endpointConfig.status || '200'))
          .json(
            generateResponse(endpointKey, endpointConfig.payload_shape, config, req.params)
          )

      switch(httpMethod) {
      case HttpMethods.Get:
        app.get(path, handler)
        break

      case HttpMethods.Post:
        app.post(path, handler)
        break

      case HttpMethods.Put:
        app.put(path, handler)
        break

      case HttpMethods.Patch:
        app.patch(path, handler)
        break

      case HttpMethods.Delete:
        app.delete(path, handler)
        break

      default:
        if (httpMethod !== 'config')
          throw new ShouldNeverBeCalled(`Invalid HTTP method discovered in ${process.env.API_CONTRACT_PATH}: ${httpMethod}`)
      }
    })
}
