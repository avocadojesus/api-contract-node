import endpointTracker from './endpoint-tracker'
import readApiContractJSON from './readApiContractJSON'
import MissingEndpointCoverage from '../exceptions/missing-endpoint-coverage'

interface TestResult {
  pass: boolean
  message?: string
}

export class EndpointTracker {
  public processedEndpoints: { [key: string]: TestResult } = {}
}

export default class EndpointTrackerSingleton {
  private static _instance: EndpointTracker
  private static _endpoints: { [key: string]: any }
  static get instance() {
    this._instance ||= new EndpointTracker()
    return this._instance
  }

  static reset() {
    this._instance = new EndpointTracker()
  }

  static get endpoints() {
    this._endpoints ||= readApiContractJSON()
    delete this._endpoints['config']
    return this._endpoints
  }

  static get processedEndpoints() {
    return this.instance.processedEndpoints
  }

  static get unprocessedEndpoints() {
    return Object
      .keys(this.endpoints)
      .filter((endpointKey: string) => !this.processedEndpoints[endpointKey])
  }
}
