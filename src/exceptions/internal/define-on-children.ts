export default class DefineOnChildren extends Error {
  private className: string
  private method: string
  constructor(className: string, method: string) {
    super()
    this.className = className
    this.method = method
  }

  get message() {
    return `
      If you are seeing this error, there is an internal bug
      within the api-contract compiler which is causing this to be reached.

      this error is being thrown because the class
        "${this.className}"

      must implement the method
        "${this.method}"
    `
  }
}

