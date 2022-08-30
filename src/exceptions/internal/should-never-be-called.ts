export default class ShouldNeverBeCalled extends Error {
  private originalMessage: string
  constructor(message: string) {
    super(message)
    this.originalMessage = message
  }

  get message() {
    return `
      If you are seeing this error, there is an internal bug
      within the api-contract compiler which is causing this to be reached.

      More than likely, this is because your api-contract.json file is malformed in some way
      that is preventing it from be interpreted correctly, but the way that it is maldformed
      was not anticipated by our internal libraries.

      the message received from the incident in question is:

        "${this.originalMessage}"
    `
  }
}
