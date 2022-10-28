import express, { Express } from 'express'
import createRoutes from './createRoutes'

export default function createServer(endpointJSONPath?: string) {
  const app: Express = express()

  app.use(express.json())
  createRoutes(app, endpointJSONPath)

  return app
}
