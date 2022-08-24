import request from 'supertest'
import createServer from '../../../src/helpers/createServer'

const app = createServer('spec/endpoint_stubs/resource/api-contract.json')

describe ('GET endpoint that serves a serialized resource', () => {
  it ('correctly mocks the serialized shape', async () => {
    const response = await request(app).get('/api/v1/users')
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.status).toEqual(200)
    expect(response.body.users![0].id).not.toBeUndefined()
    expect(response.body.users![1].id).not.toBeUndefined()
  })
})

