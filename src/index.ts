// importing this file will automatically extend jest
import './extensions/jest'
import axios from 'axios'

import _expectFullCompliance from './extensions/jest/expectFullCompliance'
import _mockEndpoint from './server/helpers/mockEndpoint'
import _resetEndpointMocks from './server/helpers/resetEndpointMocks'

export const expectFullCompliance = _expectFullCompliance
export const mockEndpoint = async (httpMethod: string, path: string, payload: {[key: string]: any}) => {
  console.log('SENDING', { httpMethod, path, payload })
  const res = await axios
    .post(
      'http://localhost:4000/__api_contract_internal/mock_endpoint',
      { httpMethod, path, payload }
    )
  console.log(res)
  // _mockEndpoint(httpMethod, path, payload)
}
export const resetEndpointMocks = _resetEndpointMocks
