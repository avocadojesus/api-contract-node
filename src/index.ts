import './extensions/jest'
import endpointTracker from './helpers/endpoint-tracker'
import readApiContractJSON from './helpers/readApiContractJSON'

export function expectCompleteCompliance() {
  const endpoints = readApiContractJSON()
  const unprocessedEndpoints = Object
    .keys(endpoints)
    .filter(endpointKey => endpointKey !== 'config' && !endpointTracker.endpointsProcessed[endpointKey])
  console.log("HIIIII", unprocessedEndpoints, endpointTracker.endpointsProcessed)
}
