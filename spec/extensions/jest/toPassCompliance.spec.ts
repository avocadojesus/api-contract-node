import '../../../src/extensions/jest'
import endpointTracker from '../../../src/helpers/endpoint-tracker'

let mockedValue: { [key: string]: any } = {}
jest.mock('../../../src/helpers/readApiContractJSON', () => jest.fn(() => mockedValue))

function mockReadJSON(payload: { [key: string]: any }) {
  mockedValue = payload
}

describe ('toPassCompliance', () => {
  it ('calls validateSchema', () => {
    mockReadJSON({
      'GET:/api/v1': {
        // intentionally passing invalid payloadshape to trigger error,
        // ensuring that validateSchema is called
        payloadshape: {
          id: 'number',
        }
      }
    })
    expect(() => {
      expect({ id: 123 }).toPassCompliance('get', '/api/v1')
    }).toThrowError()
  })

  it ('succeeds when payload matches api-contract.json', () => {
    mockReadJSON({
      'GET:/api/v1': {
        payload_shape: {
          id: 'number',
        }
      }
    })
    expect({ id: 123 }).toPassCompliance('get', '/api/v1')
  })

  it ('fails when payload does not match api-contract.json', () => {
    mockReadJSON({
      'GET:/api/v1': {
        payload_shape: {
          id: 'number',
        }
      }
    })
    expect({ id: '123' }).not.toPassCompliance('get', '/api/v1')
  })

  it ('logs results to endpoint tracker', () => {
    mockReadJSON({
      'GET:/api/v1': {
        payload_shape: {
          id: 'number',
        }
      }
    })
    endpointTracker.reset()
    expect({ id: '123' }).not.toPassCompliance('get', '/api/v1')
    expect(endpointTracker.processedEndpoints).toEqual({ 'GET:/api/v1': { pass: false } })
  })
})
