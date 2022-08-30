export default class MissingEndpointCoverage extends Error {
  private endpointKeys: string[]

  constructor(endpointKeys: string[]) {
    super()
    this.endpointKeys = endpointKeys
  }

  get message() {
    return `
      ATTENTION:
        The following endpoints have not been checked by your suite for compliance:

        ${this.endpointKeys.join("\n        ")}

      In order to obtain full coverage, make sure you run the .toPassCompliance on all
      endpoints within your api-contract.json file.
    `
  }
}

