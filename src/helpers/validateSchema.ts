// NOTE: unlike oher validation helpers, this one will raise when it detects
// invalid schema shape, since the program cannot move any further if it has
// been passed a bad api-contract.json file

import { HttpMethods } from '../config'
import {
  InvalidHttpMethod,
  InvalidEndpointPath,
  InvalidConfigKey,
  InvalidSerializerDef,
  MissingColon,
  MissingPayloadShape,
} from '../exceptions/invalid-schema'

export default function validateSchema(schema: { [key: string]: any }) {
  Object
    .keys(schema)
    .forEach(key => {
      if (key === 'config') {
        const validConfigKeys = ['serializers']
        Object
          .keys(schema.config)
          .forEach(key => {
            if (!validConfigKeys.includes(key)) throw new InvalidConfigKey(key)

            Object
              .keys(schema.config.serializers || {})
              .forEach(serializerKey => {
                if (!/^[A-Z]{1}[A-Za-z0-9]*$/.test(serializerKey)) throw new InvalidSerializerDef(serializerKey)
              })
          })

      } else {
        if (!key.includes(':')) throw new MissingColon(key)

        const [httpMethod, endpointPath] = key.split(':')
        if (!Object.values(HttpMethods).includes(httpMethod as HttpMethods)) throw new InvalidHttpMethod(key, httpMethod)
        if (!/^[A-Za-z0-9:-_\/]*$/.test(endpointPath)) throw new InvalidEndpointPath(key, endpointPath)
        if (!schema[key]['payload_shape']) throw new MissingPayloadShape(key)
      }
    })
}
