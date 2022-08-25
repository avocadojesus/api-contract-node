import '../../src/spec'

jest.mock('../../src/helpers/readApiContractJSON', () => jest.fn(() => ({
  'GET:/api/v1': {
    payload_shape: {
      id: 'number',
    }
  }
})))

describe ('toComplyWithAPIContract', () => {
  it ('succeeds when payload matches api-contract.json', () => {
    expect({ id: 123 }).toComplyWithAPIContract()
  })
})
