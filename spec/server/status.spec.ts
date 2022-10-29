import request from 'supertest'
import createServer from '../../src/server/helpers/createServer'

const app = createServer('spec/support/endpoint-stubs/status/api-contract.json')

describe ('POST endpoint', () => {
  it ('opens up POST routes correctly based on api-contrat.json', async () => {
    const response = await request(app).get('/api/v1')
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.status).toEqual(201)
  })
})
