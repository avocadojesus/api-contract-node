import '../../../src/extensions/jest'
import expectFullCompliance from '../../../src/extensions/jest/expectFullCompliance'
import endpointTracker from '../../../src/helpers/endpoint-tracker'
import MissingEndpointCoverage from '../../../src/exceptions/missing-endpoint-coverage'

let mockedValue: { [key: string]: any } = {}
jest.mock('../../../src/helpers/readApiContractJSON', () => jest.fn(() => mockedValue))

function mockReadJSON(payload: { [key: string]: any }) {
  mockedValue = payload
}

describe ('expectFullCompliance', () => {
  beforeEach(() => {
    endpointTracker.reset()
    mockReadJSON({
      'GET:/api/v1': {
        payload_shape: {
          id: 'number',
        }
      }
    })
  })

  it ('succeeds when all endpoints have been checked', () => {
    expect({ id: 123 }).toPassCompliance('get', '/api/v1')
    expect(() => {
      expectFullCompliance()
    }).not.toThrowError()
  })

  it ('succeeds when all endpoints have been checked', () => {
    expect(() => {
      expectFullCompliance()
    }).toThrowError(new MissingEndpointCoverage(['GET:/api/v1']))
  })
})
