# Api Contract

API Contract was a concept developed as an attempt to solve a critical problem facing many in the modern web development world who decide to partition their teams into segregated front and back end teams. As these teams build their apps out, it becomes difficult to consistently agree with their backend counterparts about which api endpoint we are expressing, leading to many headaches and production bugs caused by a lack of ability to do proper integration testing.

The solution proposed through `Api Contract` is to develop a single source of truth json file that both teams can share, as well as test helpers that can provide a bridge where proper integration testing is not possible.

To implement such a solution, there are several repos providing sensible implementations of this for teams, depending on what they are doing. For instance, if you are developing a backend JSON api to be consumed by a separate frontend team, Api Contract provides repos for your stack that allow you to granularly test your payload shapes to make sure they follow the correct formatting.

However, if you are on a frontend team writing in react or vuejs, Api Conract provides a repo (this one, in fact) which sidechains to your feature spec runs, providing a dummy REST API server at a port of your choosing which will listen at the same endpoints exposed in the `api-contract.json` file at the root of your frontend repo, and will serve dummy payloads in the exact shape expressed by the json file.

This allows the front-end team to spike on an agreed feature as though the backend team had already built the endpoint to spec, and ensures that once the backend team and frontend team do a coordinated deployment (after building their features using our provided test helpers to validate the shape of their own endpoints), the apps should gel together perfectly without any headaches or deployment nightmares.

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

## Contract API

The contract API refers to the way in which an `api-contract.json` file can be composed. To integrate, one needs to expose all of their endpoints to a json file, carefully exposing the intended types for each param expected in the response payload, like so:

#### Basic example

```json
{
  "GET:/api/v1/users/:id": {
    "payload_shape": {
      "user": {
        "id": "number",
        "email": "string",
        "created_at": "datetime"
      }
    }
  }
}
```

#### Nesting Example

The api supports infinite nested structures, allowing you to express payloads like:

```json
{
  "GET:/api/v1/users/:id": {
    "payload_shape": {
      "user": {
        "preferences": {
          "inapp": {
            "marketing": {
              "send_emails": "bool"
            }
          }
        }
      }
    }
  }
}
```

#### Datatypes

All datatypes supported natively by JSON are supported here, with the addition of the `date` and `datetime` datatypes, which have an expressive api for determining which format to use to validate/generate them.

##### Primary datatypes

* `string`
* `number`
* `bool`
* `date`
* `datetime`

These datatypes can be seen below in their most basic format:

```json
{
  "GET:/api/v1/users/:id": {
    "payload_shape": {
      "user": {
        "id": "number",
        "email": "string",
        "likes_cats": "bool",
        "created_at": "datetime",
        "updated_on": "date"
      }
    }
  }
}
```

All Primary types can additionally represent arrays, like so:

#### Using array values
```json
{
  "GET:/api/v1/users/:id": {
    "payload_shape": {
      "user": {
        "id": "number[]",
        "email": "string[]",
        "likes_cats": "bool[]",
        "created_at": "datetime[]",
        "updated_on": "date[]"
      }
    }
  }
}
```

They can additionally take on extended parameters (called `decorators` in the codebase), which allow them to narrow down in format, like so:

```json
{
  "GET:/api/v1/users/:id": {
    "payload_shape": {
      "amount": "number:float"
    }
  }
}
```

The full list of decorators supported (varying by type) can be found below:

#### Decorator API

* `string:uuid`: generates a uuid
* `string:email`: loosely formats for email. The test server will generate random email addresses using `faker` if this is specified.
* `string:name`: loosely formats for name. The test server will generate random names using `faker` if this is specified.
* `string:name`: Similar to name, but will generate a full name instead of a first name.
* `number:int`: creates a int, i.e. `1803`
* `number:bigint`: creates a large int, i.e. `580405389235143`
* `number:float`: creates a floating point number (with decimal precision of 2)
* `date:yyyymmdd`: generates dates with the format `YYYY-MM-DD`
* `date:yymmdd`: generates dates with the format `YY-MM-DD`
* `date:mmddyyyy`: generates dates with the format `MM-DD-YYYY`
* `date:mmddyy`: generates dates with the format `MM-DD-YY`
* `datetime:ansic`: generates **ansic**-formatted datetimes (i.e. `Mon Jan 22 15:04:05 2006`)
* `datetime:iso861`: generates **ISO861**-formatted datetimes (i.e. `2022-04-07T00:00:00.000-07:00`)
* `datetime:kitchen`: generates a time similar to a kitchen clock (i.e. `7:04PM`)
* `datetime:rfc1123`: generates **RFC1123**-formatted datetimes (i.e. `Sat, 20 Aug 2022 07:22:19 PDT`)
* `datetime:rfc1123z`: generates **RFC1123Z**-formatted datetimes (i.e. `Sat, 20 Aug 2022 07:24:17 -0700`)
* `datetime:rfcrfc3339`: generates **RFC3339**-formatted datetimes (i.e. `2022-08-20T07:27:56-07:00`)
* `datetime:rfcrfc3339_nano`: generates **RFC3339Nano**-formatted datetimes (i.e. `2022-08-20T07:33:33.671227-07:00`)
* `datetime:rfc822`: generates **RFC822**-formatted datetimes (i.e. `20 Aug 22 07:16 PDT`)
* `datetime:rfc822z`: generates **RFC822Z**-formatted datetimes (i.e. `20 Aug 22 07:17 -0700`)
* `datetime:rfc850`: generates **RFC850**-formatted datetimes (i.e. `Saturday, 20-Aug-22 07:20:10 PDT`)
* `datetime:ruby_date`: generates **RubyDate**-formatted datetimes (i.e. `Sat Aug 20 07:12:29 -0700 2022`)
* `datetime:stamp`: generates **Stamp**-formatted datetimes (i.e. `Aug 20 07:40:43`)
* `datetime:stamp_micro`: generates **StampMicro**-formatted datetimes (i.e. `Aug 20 07:45:26.087422`)
* `datetime:stamp_milli`: generates **StampMilli**-formatted datetimes (i.e. `Aug 20 07:43:36.680`)
* `datetime:stamp_nano`: generates **StampNano**-formatted datetimes (i.e. `Aug 20 07:47:27.520037000`)
* `datetime:unix`: generates **Unix**-formatted datetimes (i.e. `Sat Aug 20 07:06:22 PDT 2022`)

## Custom datatypes

In addition to the standard datatypes, Api Contract allows for custom datatypes to be defined and used throughout your `api-contract.json` file. To make use of this feature, add a `config` block to your json file, nesting a `serializers` object within. All serializer definitions will go here, and will use `PascalCase` to distinguish from primary datatypes, like so:

```js
{
  ...
  "config": {
    "serializers": {
      "User": {
        "id": "string:uuid",
        "email": "string:email"
      }
    }
  }
}
```

Once a serializer is defined, it can be used throughout your json file, like so:

```js
{
  "GET:/api/v1/users": {
    "payload_shape": {
      "users": "User[]"
    }
  },
  "GET:/api/v1/users/:id": {
    "payload_shape": {
      "user": "User"
    }
  }
}
```
