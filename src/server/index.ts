import createServer from './helpers/createServer'
import log from '../helpers/log'

const PORT = process.env.API_CONTRACT_PORT || 4000
const app = createServer()

app.listen(PORT, () => {
  log(`listening on the port ${PORT}...`)
})
