import express, { Express } from 'express'
import createRoutes from './createRoutes'

export default function createServer(endpointJSONPath?: string) {
  const app: Express = express()
  createRoutes(app, endpointJSONPath)

  app.use(express.json())
  app.use(express.urlencoded({ extended: true}))

  return app
}
