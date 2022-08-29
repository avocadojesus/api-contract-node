import createServer from '../../../src/server/helpers/createServer'
import { InvalidDecorators } from '../../../src/exceptions/invalid-schema'

describe ('GET endpoint with an invalid decorator in serializers', () => {
  it ('correctly mocks the serialized shape', async () => {
    expect(() => {
      createServer('spec/support/endpoint-stubs/invalid/invalid-decorators/api-contract.json')
    }).toThrowError(new InvalidDecorators('email', ['uuidz']))
  })
})

