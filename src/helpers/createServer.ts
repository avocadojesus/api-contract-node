import express, { Express } from 'express'
import buildRoutesFromAPIContract from './buildRoutesFromAPIContract'

export default function createServer() {
  const app: Express = express()
  buildRoutesFromAPIContract(app)
  return app
}
