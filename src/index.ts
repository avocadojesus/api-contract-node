// importing this file will automatically extend jest
import './extensions/jest'

import _expectFullCompliance from './extensions/jest/expectFullCompliance'
import _mockEndpoint from './server/helpers/mockEndpoint'
import _resetEndpointMocks from './server/helpers/resetEndpointMocks'

export const expectFullCompliance = _expectFullCompliance
export const mockEndpoint = _mockEndpoint
export const resetEndpointMocks = _resetEndpointMocks
