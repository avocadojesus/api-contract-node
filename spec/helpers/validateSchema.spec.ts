import validateSchema from '../../src/helpers/validateSchema'
import {
  InvalidHttpMethod,
  InvalidEndpointPath,
  InvalidConfigKey,
  InvalidSerializerDef,
  InvalidDecorators,
  MissingColon,
  MissingPayloadShape,
} from '../../src/exceptions/invalid-schema'

describe ('validateSchema', () => {
  it ('does not raise with a valid schema', () => {
    expect(
      () => {
        validateSchema({
          'POST:api/v1/cats': {
            payload_shape: {
              likes_cats: 'bool',
            },
          },
        })
      }
    ).not.toThrowError()
  })

  context ('with an invalid endpoint identifier', () => {
    it ('throws MissingColon when forgetting to pass a colon between the http method and the path', () => {
      expect(
        () => {
          validateSchema({
            'POSTapi/v1/cats': {
              payload_shape: {
                likes_cats: 'bool',
              },
            },
          })
        }
      ).toThrowError(new MissingColon('POSTapi/v1/cats'))
    })

    it ('throws InvalidHttpMethod when the passed http method is invalid', () => {
      expect(
        () => {
          validateSchema({
            'POSST:api/v1/cats': {
              payload_shape: {
                likes_cats: 'bool',
              },
            },
          })
        }
      ).toThrowError(new InvalidHttpMethod('POSST:api/v1/cats', 'POSST'))
    })

    it ('throws InvalidPath when the passed path does not match a valid path', () => {
      expect(
        () => {
          validateSchema({
            'POST:<?= db.get("users.*") ?>': {
              payload_shape: {
                likes_cats: 'bool',
              },
            },
          })
        }
      ).toThrowError(new InvalidEndpointPath('POST:<?= db.get("users.*") ?>', '<?= db.get("users.*") ?>'))
    })
  })

  context ('when payload_shape is missing from an endpoint config', () => {
    it ('raises MissingPayloadShapeKey exception', () => {
      expect(
        () => {
          validateSchema({
            'POST:api/v1/cats': {
              payloadshape: {
                likes_cats: 'bool',
              },
            },
          })
        }
      ).toThrowError(new MissingPayloadShape('POST:api/v1/cats'))
    })
  })

  context ('with config', () => {
    it ('does not raise when passed a valid config', () => {
      expect(
        () => {
          validateSchema({
            'POST:api/v1/cats': {
              payload_shape: {
                likes_cats: 'bool',
              },
            },
            config: {
              serializers: {
                User: {
                  id: 'number'
                }
              }
            }
          })
        }
      ).not.toThrowError()
    })

    context ('when an unrecognized key is passed to config', () => {
      it ('raises InvalidConfigKey exception', () => {
        expect(
          () => {
            validateSchema({
              'POST:api/v1/cats': {
                payload_shape: {
                  likes_cats: 'bool',
                },
              },
              config: {
                cerealizers: {
                  User: {
                    id: 'number'
                  }
                }
              }
            })
          }
        ).toThrowError(new InvalidConfigKey('cerealizers'))
      })

      it ('raises InvalidSerializerDef', () => {
        expect(
          () => {
            validateSchema({
              'POST:api/v1/cats': {
                payload_shape: {
                  likes_cats: 'bool',
                },
              },
              config: {
                serializers: {
                  user: {
                    id: 'number'
                  }
                }
              }
            })
          }
        ).toThrowError(new InvalidSerializerDef('user'))
      })
    })
  })

  context ('with invalid decorators passed to payload key', () => {
    context ('with invalid bool decorator', () => {
      it ('raises InvalidDecorator exception', () => {
        expect(
          () => {
            validateSchema({
              'POST:api/v1/cats': {
                payload_shape: {
                  likes_cats: 'bool:email',
                },
              },
            })
          }
        ).toThrowError(new InvalidDecorators('likes_cats', ['email']))
      })
    })

    context ('with invalid date decorator', () => {
      it ('raises InvalidDecorators exception', () => {
        expect(
          () => {
            validateSchema({
              'POST:api/v1/cats': {
                payload_shape: {
                  created_at: 'date:yyyyymmdd',
                },
              },
            })
          }
        ).toThrowError(new InvalidDecorators('created_at', ['yyyyymmdd']))
      })
    })

    context ('with invalid datetime decorator', () => {
      it ('raises InvalidDecorators exception', () => {
        expect(
          () => {
            validateSchema({
              'POST:api/v1/cats': {
                payload_shape: {
                  created_at: 'datetime:yyyymmdd',
                },
              },
            })
          }
        ).toThrowError(new InvalidDecorators('created_at', ['yyyymmdd']))
      })
    })

    context ('with invalid number decorator', () => {
      it ('raises InvalidDecorators exception', () => {
        expect(
          () => {
            validateSchema({
              'POST:api/v1/cats': {
                payload_shape: {
                  id: 'number:bigolint',
                },
              },
            })
          }
        ).toThrowError(new InvalidDecorators('id', ['bigolint']))
      })
    })

    context ('with invalid string decorator', () => {
      it ('raises InvalidDecorators exception', () => {
        expect(
          () => {
            validateSchema({
              'POST:api/v1/cats': {
                payload_shape: {
                  email: 'string:gmail',
                },
              },
            })
          }
        ).toThrowError(new InvalidDecorators('email', ['gmail']))
      })
    })

    context ('with invalid custom decorator', () => {
      it ('raises InvalidDecorators exception', () => {
        expect(
          () => {
            validateSchema({
              'POST:api/v1/cats': {
                payload_shape: {
                  user: 'User:optsional',
                },
              },
            })
          }
        ).toThrowError(new InvalidDecorators('user', ['optsional']))
      })
    })

    context ('with nested values', () => {
      it ('still raises InvalidDecorators exception', () => {
        expect(
          () => {
            validateSchema({
              'POST:api/v1/cats': {
                payload_shape: {
                  user: {
                    preferences: {
                      id: "number:bigolint"
                    }
                  }
                },
              },
            })
          }
        ).toThrowError(new InvalidDecorators('id', ['bigolint']))
      })
    })
  })
})
