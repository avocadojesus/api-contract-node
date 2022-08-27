// this file is meant to be included within a jest testing environment.
// it is the main package export of this package, even though it is named `spec.ts`,
// because it's purpose is to extend the jest expectations to provide helpful test assertions
// for integrating with a node-based JSON api server.
//
// its primary purpose is to provide validtion helpers that will
// be useful to engineers adhering to the api contract json standard while writing a node server
import { ApiContractOptions } from '../../config'
import readApiContractJSON from '../../helpers/readApiContractJSON'
import endpointKey from '../../helpers/endpointKey'
import validate from '../../validate'

expect.extend({
  toPassCompliance(received, httpMethod: string, endpointPath: string) {
    const endpoints = readApiContractJSON()
    const config: ApiContractOptions = endpoints.config
    const endpointConfig = endpoints[endpointKey(httpMethod, endpointPath)]
    if (!endpointConfig) throw `unable to find endpoint: ${endpointKey(httpMethod, endpointPath)}`

    const pass = validate(received, endpointConfig.payload_shape, config)

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
  }
})
