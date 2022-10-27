# Api Contract

API Contract was a concept developed to solve integration testing challenges with split frontend/backend teams on separate repos/tech stacks. For more information on how/why it was developed, see the [Api Contract wiki](https://github.com/avocadojesus/api-contract-node/wiki). Additionally, if you would like more information on the json api, that can be found [here (subnested in the wiki)](https://github.com/avocadojesus/api-contract-node/wiki/JSON-API).

# api-contract-node

This repo provides a dummy REST server running express which serves dummy endpoints based on supplied `api-contract.json` file. It serves payload shapes based on the payload schema described for each endpoint within a file.

## Installation

```
yarn add https://github.com/avocadojesus/api-contract-node.git
```

## Setup

It is recommended that you use this repo in conjunction with feature/end-to-end tests. Commonly, this is done by leveraging the jest-puppeteer package, which will is also poised to conveniently launch a development server which tails your spec runs.

If your package is not already set up with jest-puppeteer, you will first need to make sure to import the packages:

### Installing jest-puppeteer

```
yarn add -D puppeteer jest-puppeteer
```

### Add separate jest file for feature specs

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

The above jest config works well with `nuxt`, but may need to be tweaked if you are using a different framework or stack.

### add command to run feature specs

Once you have added this file, you can configure a separate test script for running end-to-end tests, like so:

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

### add jest-puppeteer.config.js

When configuring puppeteer-jest, you will want to include the custom file required to launch a dev server alongside our spec run, like so:

```js
// jest-puppeteer.config.js

module.exports = {
  server: {
    command: 'yarn --cwd ./node_modules/api-contract-node start',
    launchTimeout: 15000, // the default is 5000, which is generally too short for a dry run.
    debug: true, // set to true if your server is having trouble starting.
  },
}
```

## Usage

### Test server

The purpose of the test server provided by this package is to provide a dummy api server that can automatically provide responses in the payload shapes you expect, which can simulate the behavior of actually interacting with a real backend. All of the responses will be in the shapes given by the provided `api-contract.json` file.

This means that if your `api-contract.json` file were to look like this:

```json
{
  "GET:/api/v1/users": {
    "payload_shape": {
      "users": "User[]"
    }
  },
  "config": {
    "serializers": {
      "User": {
        "id": "number",
        "email": "string:email"
      }
    }
  }
}
```

your response from the server would look something like:

```js
// GET /api/v1/users
{
  "users": [
    { "id": 9999777, "email": "fred@coolguy.biz" },
    { "id": 6565143, email: "james@who.net" }
  ]
}
```

#### Automagic param injection

In addition to responding to the provided decorators (Note the above case, where the `email` decorator is leading to generated email addresses), the responses will also sensibly respond to url params. This means that given the following `api-contract.json`:

```js
{
  "GET:/api/v1/users/:id": {
    "payload_shape": {
      "user": "User"
    }
  },
  "config": {
    "serializers": {
      "User": {
        "id": "number",
        "email": "string:email"
      }
    }
  }
}
```

visiting a matching url would force an overwrite on the `id` payload value, setting it to whatever was passed in the params.

```js
// GET /api/v1/users/123
{
  "user": { "id": 123, "email": "fred@coolguy.biz" }
}
```

#### Test server hello world spec

You can write a helloworld feature spec in the `spec/features` dir to ensure that puppeteer/jest is wired up correctly like so:

```js
// spec/features/api-contract-test-hello-world.spec.ts

describe('api-contract-node can launch', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4000/api/v1')
  })

  it("this won't actually test anything, but it will print the contents of a GET:api/v1 within your api-contract.json file.", async () => {
    const bodyHTML = await page.evaluate(() =>  document.documentElement.outerHTML);
    console.log(bodyHTML)
  })
})
```

Once you get this helloworld working, you can change the base api url within your app to point to this dummy server while running tests, allowing it to serve requests in the shapes you expect for testing purposes.


#### Test server options

Options can be passed via env vars to the underlying command by simply adding them to the server command portion of the `jest-puppeteer.config.js` file, like so:

```js
// jest-puppeteer.config.js
...
server: {
  command: 'cd ./node_modules/api-contract-node && yarn build && API_CONTRACT_PATH=<PATH_TO_API_CONTRACT_JSON_FILE> API_CONTRACT_PORT=<YOUR_PORT_HERE> yarn start',
  port: <YOUR_PORT_HERE>,
  ...
}
...
```

* `API_CONTRACT_PATH`: The path to the `api-contract.json` file containing the schema you want it to expose. If not specified, it will look in your project root.
* `API_CONTRACT_PORT`: specifies the port to run the api contract test server on. If not specified, it will default to `4000`

### Jest helpers

In addition to the provided test server, a jest extension is applied upon importing this package, so if you are working on a backend node server with a JSON delivery system, you can use our custom jest helper to validate that the shape of your endponts matches your api contract, like so:

```js
import 'api-contract-node'

...

expect({
  user: {
    id: '2CE0E7AC-D9B6-40C9-9A97-A8737172B685',
    email: 'fred@fred.fred',
    name: 'fred',
    likes_cats: true,
    subscription_cost: 123.456,
    created_at: 'Saturday, 20-Aug-22 07:20:10 PDT',
    stuff: {
      piano: true,
      guitar: true,
    },
  }
}).toPassCompliance('get', '/api/v1/:id')
```

which will pass with the following `api-contract.json`:

```json
{
  "GET:/api/v1/:id": {
    "payload_shape": {
      "user": "User"
    }
  },
  "config": {
    "serializers": {
      "User": {
        "id": "string:uuid",
        "email": "string:email",
        "name": "string:name",
        "likes_cats": "bool",
        "subscription_cost": "number:float",
        "created_at": "datetime:rfc850",
        "stuff": {
          "piano": "bool",
          "guitar": "bool"
        }
      }
    }
  }
}
```

Once all specs have been run, you can additionally run `expectFullCompliance` to ensure that your test suite has called `toPassCompliance` for every endpoint you have provided in your `api-contract.json` file.

### expectFullCompliance example

```js
import { expectFullCompliance } from 'api-contract-node'

// this needs to be run after all tests have finished:
expectFullCompliance()
```

doing this will raise a detailed exception, informing you of which endpoints you have not covered yet, unless you have full coverage for all endpoints in your `api-contract.json` file.


# Types

to update types, clone `api-contract-node-types` repo and run:

```
cp -r ./dist/src/* ../api-contract-node-types
```
