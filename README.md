# Api Contract

API Contract was a concept developed to solve integration testing challenges with split frontend/backend teams on separate repos/tech stacks. For more information on how/why it was developed, see the [Api Contract wiki](https://github.com/avocadojesus/api-contract-test-server/wiki). Additionally, if you would like more information on the json api, that can be found [here (subnested in the wiki)](https://github.com/avocadojesus/api-contract-test-server/wiki/JSON-API)

# api-contract-test-server

This repo provides a dummy REST server running express which serves dummy endpoints based on supplied `api-contract.json` file. It serves payload shapes based on the payload schema described for each endpoint within a file.

# Installation

```
yarn add https://github.com/avocadojesus/api-contract-test-server.git
```

# Setup

It is recommended that you use this repo in conjunction with feature/end-to-end tests. Commonly, this is done by leveraging the jest-puppeteer package, which will is also poised to conveniently launch a development server which tails your spec runs.

If your package is not already set up with jest-puppeteer, you will first need to make sure to import the packages:

```
yarn add -D puppeteer jest-puppeteer
```

Additionally, you will need to configure jest to integrate puppeteer. I recommend having a separate jest config file to handle this, like so:

```js
// jest.features.config.js

module.exports = {
  preset: 'jest-puppeteer',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'vue',
    'json'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue'
  ],
}
```

The above jest config works well with `nuxt`, but may need to be tweaked if you are using a different framework or stack. Once you have added this file, you can configure a separate test script for running end-to-end tests, like so:

```js
// package.json
{
  ...
  "scripts": {
    "spec": "your current test script",
    "fspec": "jest --config=jest.features.config.js --testPathPattern=spec/features/"
  }
  ...
}
```

When configuring puppeteer-jest, you will want to include the custom file required to launch a dev server alongside our spec run, like so:

```js
// jest-puppeteer.config.js

module.exports = {
  server: {
    command: 'yarn --cwd ./node_modules/api-contract-test-server start',
    launchTimeout: 15000, // the default is 5000, which is generally too short for a dry run.
    debug: true, // set to true if your server is having trouble starting.
  },
}
```

### Writing a test

Once all this is set up, you can write a feature spec in the `spec/features` dir, like so:

```js
// spec/features/api-contract-test-hello-world.spec.ts

describe('api-contract-test-server can launch', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4000/api/v1')
  })

  it("this won't actually test anything, but it will print the contents of a GET:api/v1 within your api-contract.json file.", async () => {
    const bodyHTML = await page.evaluate(() =>  document.documentElement.outerHTML);
    console.log(bodyHTML)
  })
})
```

# Options

Options can be passed via env vars to the underlying command by simply adding them to the server command portion of the `jest-puppeteer.config.js` file, like so:

```js
// jest-puppeteer.config.js
...
server: {
  command: 'cd ./node_modules/api-contract-test-server && yarn build && API_CONTRACT_PATH=<PATH_TO_API_CONTRACT_JSON_FILE> API_CONTRACT_PORT=<YOUR_PORT_HERE> yarn start',
  port: <YOUR_PORT_HERE>,
  ...
}
...
```

## CLI API
* `API_CONTRACT_PATH`: The path to the `api-contract.json` file containing the schema you want it to expose. If not specified, it will look in your project root.
* `API_CONTRACT_PORT`: specifies the port to run the api contract test server on. If not specified, it will default to `4000`
