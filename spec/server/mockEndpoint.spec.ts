import request from 'supertest'
import createServer from '../../src/server/helpers/createServer'
import mockEndpoint from '../../src/server/helpers/mockEndpoint'

const app = createServer('spec/support/endpoint-stubs/resource/api-contract.json')

describe ('GET endpoint', () => {
  it ('opens up GET routes correctly based on api-contrat.json', async () => {
    mockEndpoint('get', '/api/v1/test', { user: { email: 'ham', id: 123 } })
    const response = await request(app).get('/api/v1/test')
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.status).toEqual(200)
    expect(response.body.user?.id).toEqual(123)
    expect(response.body.user?.email).toEqual('ham')
  })
})
