interface TestResult {
  pass: boolean
  message?: string
}

export class EndpointTracker {
  public endpointsProcessed: { [key: string]: TestResult } = {}
}

export default class EndpointTrackerSingleton {
  private static _instance: EndpointTracker
  static get instance() {
    this._instance ||= new EndpointTracker()
    return this._instance
  }

  static reset() {
    this._instance = new EndpointTracker()
  }

  static get endpointsProcessed() {
    return this.instance.endpointsProcessed
  }
}
