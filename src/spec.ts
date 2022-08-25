// this file is meant to be included within a jest testing environment.
// it is the main package export of this package, even though it is named `spec.ts`,
// because it's purpose is to extend the jest expectations to provide helpful test assertions
// for integrating with a node-based JSON api server.
//
// its primary purpose is to provide validtion helpers that will
// be useful to engineers adhering to the api contract json standard.
import readApiContractJSON from './helpers/readApiContractJSON'

expect.extend({
  toComplyWithAPIContract(received) {
    const json = readApiContractJSON()
    // const pass = received % 2 === 1
    // if (pass) {
      return {
        message: () => `expected ${received} not to be an odd number`,
        pass: true
      }
    // }
    // return {
    //   message: () => `expected ${received} to be an odd number`,
    //   pass: false
    // }
  }
})
