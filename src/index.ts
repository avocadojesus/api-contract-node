// importing this file will automatically extend jest
import './extensions/jest'
import superagent from 'superagent'

import _expectFullCompliance from './extensions/jest/expectFullCompliance'
import _mockEndpoint from './server/helpers/mockEndpoint'
import _resetEndpointMocks from './server/helpers/resetEndpointMocks'

export const expectFullCompliance = _expectFullCompliance
export const mockEndpoint = async (httpMethod: string, path: string, payload: {[key: string]: any}) => {
  const res = await superagent
    .post('http://localhost:4000/__api_contract_internal/create-mock?httpMethod')
    .send({ httpMethod, path, payload })
  console.log(res)
  // _mockEndpoint(httpMethod, path, payload)
}
export const resetEndpointMocks = _resetEndpointMocks
