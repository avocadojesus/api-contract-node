import express, { Express } from 'express'
import createRoutes from './createRoutes'
import cors from 'cors'

export default function createServer(endpointJSONPath?: string) {
  const app: Express = express()

  app.use(express.json())
  app.use(cors())
  createRoutes(app, endpointJSONPath)

  return app
}
