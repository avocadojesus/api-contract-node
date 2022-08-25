import request from 'supertest'
import createServer from '../../../src/server/helpers/createServer'

const app = createServer('spec/endpoint_stubs/resource/api-contract.json')

describe ('DELETE endpoint', () => {
  it ('opens up DELETE routes correctly based on api-contrat.json', async () => {
    const response = await request(app).delete('/api/v1/test')
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.status).toEqual(200)
    expect(response.body.destroy).not.toBeUndefined()
  })
})
