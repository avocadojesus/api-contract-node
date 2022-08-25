import express, { Express } from 'express'
import buildRoutesFromAPIContract from './buildRoutesFromAPIContract'

export default function createServer(endpointJSONPath?: string) {
  const app: Express = express()
  buildRoutesFromAPIContract(app, endpointJSONPath)
  return app
}
