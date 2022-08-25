import createServer from './helpers/createServer'

const PORT = process.env.API_CONTRACT_PORT || 4000
const app = createServer('spec/endpoint_stubs/nested/api-contract.json')

app.listen(PORT, () => {
  console.log(`listening on the port ${PORT}...`)
})
