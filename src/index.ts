import './extensions/jest'
import endpointTracker from './helpers/endpoint-tracker'
import readApiContractJSON from './helpers/readApiContractJSON'
import MissingEndpointCoverage from './exceptions/missing-endpoint-coverage'

export function expectCompleteCompliance() {
  const endpoints = readApiContractJSON()
  const unprocessedEndpoints = Object
    .keys(endpoints)
    .filter(endpointKey => endpointKey !== 'config' && !endpointTracker.endpointsProcessed[endpointKey])

  if (!!unprocessedEndpoints.length) throw new MissingEndpointCoverage(unprocessedEndpoints)
}
