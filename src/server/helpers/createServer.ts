import express, { Express } from 'express'
import bodyParser from 'body-parser'
import createRoutes from './createRoutes'

export default function createServer(endpointJSONPath?: string) {
  const app: Express = express()
  createRoutes(app, endpointJSONPath)

  // app.use(bodyParser.json())
  // app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.json())
  // app.use(express.urlencoded({ extended: true }))
  // app.use(express.urlencoded({ extended: true}))

  return app
}
