import createServer from './helpers/createServer'

const PORT = process.env.API_CONTRACT_PORT || 4000
const app = createServer()

app.listen(PORT, () => {
  console.log(`listening on the port ${PORT}...`)
})
