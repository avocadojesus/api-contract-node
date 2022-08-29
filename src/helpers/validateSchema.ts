// NOTE: unlike oher validation helpers, this one will raise when it detects
// invalid schema shape, since the program cannot move any further if it has
// been passed a bad api-contract.json file

import { HttpMethods } from '../config'
import {
  InvalidHttpMethod,
  InvalidEndpointPath,
  InvalidConfigKey,
  InvalidSerializerDef,
  InvalidDecorators,
  MissingColon,
  MissingPayloadShape,
} from '../exceptions/invalid-schema'
import parseDatatype from '../helpers/parseDatatype'
import {
  PrimaryDatatype,
  BoolDecorators,
  StringDecorators,
  DateDecorators,
  DatetimeDecorators,
  NumberDecorators,
  CustomDecorators,
} from '../config'

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
                const serializer = schema.config.serializers[serializerKey]
                validatePayloadKey(key, serializer)
              })
          })

      } else {
        if (!key.includes(':')) throw new MissingColon(key)

        const [httpMethod, endpointPath] = key.split(':')
        if (!Object.values(HttpMethods).includes(httpMethod as HttpMethods)) throw new InvalidHttpMethod(key, httpMethod)
        if (!/^[A-Za-z0-9:-_\/]*$/.test(endpointPath)) throw new InvalidEndpointPath(key, endpointPath)
        if (!schema[key]['payload_shape']) throw new MissingPayloadShape(key)

        Object
          .keys(schema[key]['payload_shape'])
          .forEach(payloadKey => {
            const val = schema[key]['payload_shape'][payloadKey]
            validatePayloadKey(payloadKey, val)
          })
      }
    })
}

function validatePayloadKey(key: string, val: any) {
  if (val && typeof val === 'object') {
    Object
      .keys(val)
      .forEach(payloadKey => {
        validatePayloadKey(payloadKey, val[payloadKey])
      })
  } else if (typeof val === 'string') {
    validateDecorators(key, val as string)
  } else {
    throw 'should never reach this'
  }
}

function validateDecorators(key: string, val: string) {
  const { datatype, decorators } = parseDatatype(val)
  decorators.forEach(decorator => {
    switch(datatype) {
    case PrimaryDatatype.Bool:
      if (!Object.values(BoolDecorators).includes(decorator as BoolDecorators)) throw new InvalidDecorators(key, decorators)
      break

    case PrimaryDatatype.Date:
      if (!Object.values(DateDecorators).includes(decorator as DateDecorators)) throw new InvalidDecorators(key, decorators)
      break

    case PrimaryDatatype.Datetime:
      if (!Object.values(DatetimeDecorators).includes(decorator as DatetimeDecorators)) throw new InvalidDecorators(key, decorators)
      break

    case PrimaryDatatype.Number:
      if (!Object.values(NumberDecorators).includes(decorator as NumberDecorators)) throw new InvalidDecorators(key, decorators)
      break

    case PrimaryDatatype.String:
      if (!Object.values(StringDecorators).includes(decorator as StringDecorators)) throw new InvalidDecorators(key, decorators)
      break

    default:
      if (!Object.values(CustomDecorators).includes(decorator as CustomDecorators)) throw new InvalidDecorators(key, decorators)
    }
  })
}
