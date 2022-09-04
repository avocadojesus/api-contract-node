// this file is meant to be included within a jest testing environment.
// its primary purpose is to provide validtion helpers that will
// be useful to engineers adhering to the api contract json standard while writing a node server
import { ApiContractOptions } from '../../config'
import readApiContractJSON from '../../helpers/readApiContractJSON'
import endpointKey from '../../helpers/endpointKey'
import validate from '../../validate'
import validateSchema from '../../helpers/validateSchema'
import endpointTracker from '../../helpers/endpoint-tracker'
import InvalidEndpoint from '../../exceptions/invalid-endpoint'

expect.extend({
  toPassCompliance(received, httpMethod: string, endpointPath: string) {
    const endpoints = readApiContractJSON()
    const config: ApiContractOptions = endpoints.config

    const endpointConfig = endpoints[endpointKey(httpMethod, endpointPath)]
    if (!endpointConfig) throw new InvalidEndpoint(endpointKey(httpMethod, endpointPath))

    validateSchema(endpoints)

    const pass = validate(received, endpointConfig.payload_shape, config)
    endpointTracker.processedEndpoints[endpointKey(httpMethod, endpointPath)] = { pass }

    return {
      message: () => {
        const message = `expected:
          ${JSON.stringify(received)}
        not to match:
          ${JSON.stringify(endpoints)}`
        return pass ? message : message.replace(/not to match:\n/, "to match:\n")
      },
      pass,
    }
  },
})
