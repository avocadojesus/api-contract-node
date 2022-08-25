import request from 'supertest'
import createServer from '../../../src/server/helpers/createServer'

const app = createServer('spec/endpoint_stubs/resource/api-contract.json')

describe ('GET endpoint', () => {
  it ('opens up GET routes correctly based on api-contrat.json', async () => {
    const response = await request(app).get('/api/v1/test')
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.status).toEqual(200)
    expect(response.body.user?.id).not.toBeUndefined()
    expect(response.body.user?.email).not.toBeUndefined()
  })
})
