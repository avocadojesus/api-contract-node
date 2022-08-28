export class JSONFileNotFound extends Error {
  private location: string

  constructor(location: string) {
    super()
    this.location = location
  }

  get message() {
    return `Failed to locate api-contract.json${ this.location && ` at ${this.location}` }. Please check to make sure there is an api-contract.json file at the root of your project.`
  }
}

export class InvalidJSON extends Error {
  private location: string
  private error: Error

  constructor(location: string, error: Error) {
    super()
    this.location = location
    this.error = error
  }

  get message() {
    return `
      Failed to parse api-contract.json${ this.location && ` at ${this.location}` }. Please check to make sure it contains valid JSON. The error raised was:
        ${this.error}
    `
  }
}


