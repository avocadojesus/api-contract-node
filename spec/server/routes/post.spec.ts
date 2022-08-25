import request from 'supertest'
import createServer from '../../../src/server/helpers/createServer'

const app = createServer('spec/endpoint_stubs/resource/api-contract.json')

describe ('POST endpoint', () => {
  it ('opens up POST routes correctly based on api-contrat.json', async () => {
    const response = await request(app).post('/api/v1/test')
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.status).toEqual(200)
    expect(response.body.name).not.toBeUndefined()
    expect(response.body.email).not.toBeUndefined()
  })
})
