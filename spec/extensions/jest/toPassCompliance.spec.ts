import '../../../src/extensions/jest'

let mockedValue: { [key: string]: any } = {}
jest.mock('../../../src/helpers/readApiContractJSON', () => jest.fn(() => mockedValue))

function mockReadJSON(payload: { [key: string]: any }) {
  mockedValue = payload
}

describe ('toPassCompliance', () => {
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
})
