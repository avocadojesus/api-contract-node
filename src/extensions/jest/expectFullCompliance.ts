import endpointTracker from '../../helpers/endpoint-tracker'
import readApiContractJSON from '../../helpers/readApiContractJSON'
import MissingEndpointCoverage from '../../exceptions/missing-endpoint-coverage'

export default function expectFullCompliance() {
  const endpoints = readApiContractJSON()
  const unprocessedEndpoints = Object
    .keys(endpoints)
    .filter(endpointKey => endpointKey !== 'config' && !endpointTracker.processedEndpoints[endpointKey])

  if (endpointTracker.unprocessedEndpoints.length) throw new MissingEndpointCoverage(unprocessedEndpoints)
}
