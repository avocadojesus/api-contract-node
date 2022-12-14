import { HttpMethods, allDecorators } from '../config'

export class MissingColon extends Error {
  private key: string

  constructor(key: string) {
    super()
    this.key = key
  }

  get message() {
    return `
      invalid endpoint identifier passed.
      The invalid endpoint identifier we received from you is:
        '${this.key}'.

      To fix, ensure that your endpoint identifier matches the following format:
        "HTTPMETHOD:/path/to/url"
      i.e.
        "POST:/api/v1/users"
        "GET:/"

      The available Http methods are:
        ${Object.values(HttpMethods).join(', ')}
    `
  }
}

export class MissingPayloadShape extends Error {
  private key: string

  constructor(key: string) {
    super()
    this.key = key
  }

  get message() {
    return `
      missing required key 'payload_shape' for the following endpoint identifier:
        '${this.key}'

      Each endpoint is required to have a 'payload_shape' key, like so:
        "POST:/api/v1/users": {
          "payload_shape": {
            "id": "number",
            ...etc
          }
        }
    `
  }
}

export class InvalidSerializerDef extends Error {
  private key: string

  constructor(key: string) {
    super()
    this.key = key
  }

  get message() {
    return `
      Invalid serializer definition passed to config object:
        '${this.key}'

      When defining a serializer, make sure to use PascalCase identifiers, ensuring that
      the first letter is always capitalized, like so:
        "config": {
          "serializers": {
            "UserPreferences": {
              "id": "number"
            }
          }
        }
    `
  }
}

export class InvalidConfigKey extends Error {
  private key: string

  constructor(key: string) {
    super()
    this.key = key
  }

  get message() {
    return `
      Invalid config key passed to config object:
        '${this.key}'

      currently, the only valid config key is "serializers", which should result in a config shape like this:
        "config": {
          "serializers": {
            "User": {
              "id": "number"
            }
          }
        }
    `
  }
}

export class InvalidDecorators extends Error {
  private receivedDecorators: any
  private key: string

  constructor(key: string, receivedDecorators: string[]) {
    super()
    this.receivedDecorators = receivedDecorators
    this.key = key
  }

  get message() {
    return `
      unrecognized decorators passed for payload key:
        '${this.key}'

      The decorators we received from you are:
        '${this.receivedDecorators.join(', ')}'.

      A list of all available decorators are:
        ${allDecorators().join(",\n        ")}

      *NOTE: In the case of custom types, the symbol '<CustomType>' should be replaced
      by the name of your custom type (declared as a serializer within the config block
      of your 'api-contract.json' file, like so:

      {
        "POST:/api/v1/users": {
          "payload_shape": {
            "user": "User:optional"
          }
        },
        "config": {
          "serializers": {
            "User": {
              "id": "string:uuid"
            }
          }
        }
      }
    `
  }
}

export class InvalidHttpMethod extends Error {
  private receivedHttpMethod: any
  private key: string

  constructor(key: string, receivedHttpMethod: any) {
    super()
    this.receivedHttpMethod = receivedHttpMethod
    this.key = key
  }

  get message() {
    return `
      unrecognized http method passed for endpoint:
        '${this.key}'

      The http method we received from you is:
        '${this.receivedHttpMethod}'.

      The allowed http methods are:
        '${Object.values(HttpMethods).join(', ')}'
    `
  }
}

export class InvalidEndpointPath extends Error {
  private receivedEndpoint: any
  private key: string

  constructor(key: string, receivedEndpoint: any) {
    super()
    this.receivedEndpoint = receivedEndpoint
    this.key = key
  }

  get message() {
    return `
      unrecognized endpoint path passed for endpoint:
        '${this.key}'

      The endpoint path we received from you is:
        '${this.receivedEndpoint}'.

      A valid endpoint path should resemble the uri portion of a url, like so:
        '/api/v1/users'

      Resulting in an endpoint identifier looking something like:
        'POST:/api/v1/users'
    `
  }
}
