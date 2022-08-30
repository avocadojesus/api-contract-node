import { HttpMethods } from '../config'

export default class InvalidEndpoint extends Error {
  private endpointKey: string

  constructor(endpointKey: string) {
    super()
    this.endpointKey = endpointKey
  }

  get message() {
    return `
      Unrecognized endpoint passed:
        '${this.endpointKey}'

      Check your api-contract.json file to ensure that you are passing an
      http method and endpoint that exists.
    `
  }
}
