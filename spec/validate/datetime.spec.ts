import validate from '../../src/validate'

describe ('validate', () => {
  it ('returns true when detecting a valid datetime', () => {
    expect(validate({ created_at: '2022-04-07T00:00:00.000-07:00' }, { created_at: 'datetime' })).toEqual(true)
  })

  it ('returns false when detecting an invalid datetime', () => {
    expect(validate({ created_at: '2022-04-07T00:00:00.000' }, { created_at: 'datetime' })).toEqual(false)
    expect(validate({ created_at: ['2022-04-07T00:00:00.000-07:00'] }, { created_at: 'datetime' })).toEqual(false)
  })

  context ('with array type', () => {
    it ('returns true when detecting a valid datetime array', () => {
      expect(validate({ created_at: ['2022-04-07T00:00:00.000-07:00'] }, { created_at: 'datetime[]' })).toEqual(true)
    })

    it ('returns false when detecting an invalid datetime array', () => {
      expect(validate({ created_at: [1] }, { created_at: 'datetime[]' })).toEqual(false)
      expect(validate({ created_at: '2022-04-07T00:00:00.000-07:00' }, { created_at: 'datetime[]' })).toEqual(false)
    })
  })

  context ('decorators', () => {
    context ('ansic decorator is passed', () => {
      it ('returns true when detecting a valid ansic', () => {
        expect(validate({ created_at: 'Mon Jan 22 15:04:05 2006' }, { created_at: 'datetime:ansic' })).toEqual(true)
      })

      it ('returns false when detecting an invalid ansic', () => {
        expect(validate({ created_at: 'Mon Jan 22 15:04:05' }, { created_at: 'datetime:ansic' })).toEqual(false)
      })
    })

    context ('iso861 decorator is passed', () => {
      it ('returns true when detecting a valid iso861', () => {
        expect(validate({ created_at: '2022-04-07T00:00:00.000-07:00' }, { created_at: 'datetime:iso861' })).toEqual(true)
      })

      it ('returns false when detecting an invalid iso861', () => {
        expect(validate({ created_at: 'Mon Jan 22 15:04:05' }, { created_at: 'datetime:iso861' })).toEqual(false)
      })
    })

    context ('kitchen decorator is passed', () => {
      it ('returns true when detecting a valid kitchen', () => {
        expect(validate({ created_at: '7:35PM' }, { created_at: 'datetime:kitchen' })).toEqual(true)
      })

      it ('returns false when detecting an invalid kitchen', () => {
        expect(validate({ created_at: 'Mon Jan 22 15:04:05' }, { created_at: 'datetime:kitchen' })).toEqual(false)
      })
    })

    context ('rfc1123 decorator is passed', () => {
      it ('returns true when detecting a valid rfc1123', () => {
        expect(validate({ created_at: 'Sat, 20 Aug 2022 07:22:19 PDT' }, { created_at: 'datetime:rfc1123' })).toEqual(true)
      })

      it ('returns false when detecting an invalid rfc1123', () => {
        expect(validate({ created_at: 'Mon Jan 22 15:04:05' }, { created_at: 'datetime:rfc1123' })).toEqual(false)
      })
    })

    context ('rfc1123z decorator is passed', () => {
      it ('returns true when detecting a valid rfc1123z', () => {
        expect(validate({ created_at: 'Sat, 20 Aug 2022 07:24:17 -0700' }, { created_at: 'datetime:rfc1123z' })).toEqual(true)
      })

      it ('returns false when detecting an invalid rfc1123z', () => {
        expect(validate({ created_at: 'Mon Jan 22 15:04:05' }, { created_at: 'datetime:rfc1123z' })).toEqual(false)
      })
    })

    context ('rfc3339 decorator is passed', () => {
      it ('returns true when detecting a valid rfc3339', () => {
        expect(validate({ created_at: '2022-08-20T07:27:56-07:00' }, { created_at: 'datetime:rfc3339' })).toEqual(true)
      })

      it ('returns false when detecting an invalid rfc3339', () => {
        expect(validate({ created_at: 'Mon Jan 22 15:04:05' }, { created_at: 'datetime:rfc3339' })).toEqual(false)
      })
    })

    context ('rfc3339_nano decorator is passed', () => {
      it ('returns true when detecting a valid rfc3339_nano', () => {
        expect(validate({ created_at: '2022-08-20T07:33:33.671227-07:00' }, { created_at: 'datetime:rfc3339_nano' })).toEqual(true)
      })

      it ('returns false when detecting an invalid rfc3339_nano', () => {
        expect(validate({ created_at: 'Mon Jan 22 15:04:05' }, { created_at: 'datetime:rfc3339_nano' })).toEqual(false)
      })
    })

    context ('rfc822 decorator is passed', () => {
      it ('returns true when detecting a valid rfc822', () => {
        expect(validate({ created_at: '20 Aug 22 07:16 PDT' }, { created_at: 'datetime:rfc822' })).toEqual(true)
      })

      it ('returns false when detecting an invalid rfc822', () => {
        expect(validate({ created_at: 'Mon Jan 22 15:04:05' }, { created_at: 'datetime:rfc822' })).toEqual(false)
      })
    })

    context ('rfc822z decorator is passed', () => {
      it ('returns true when detecting a valid rfc822z', () => {
        expect(validate({ created_at: '20 Aug 22 07:17 -0700' }, { created_at: 'datetime:rfc822z' })).toEqual(true)
      })

      it ('returns false when detecting an invalid rfc822z', () => {
        expect(validate({ created_at: 'Mon Jan 22 15:04:05' }, { created_at: 'datetime:rfc822z' })).toEqual(false)
      })
    })

    context ('rfc850 decorator is passed', () => {
      it ('returns true when detecting a valid rfc850', () => {
        expect(validate({ created_at: 'Saturday, 20-Aug-22 07:20:10 PDT' }, { created_at: 'datetime:rfc850' })).toEqual(true)
      })

      it ('returns false when detecting an invalid rfc850', () => {
        expect(validate({ created_at: 'Mon Jan 22 15:04:05' }, { created_at: 'datetime:rfc850' })).toEqual(false)
      })
    })

    context ('ruby_date decorator is passed', () => {
      it ('returns true when detecting a valid ruby_date', () => {
        expect(validate({ created_at: 'Sat Aug 20 07:12:29 -0700 2022' }, { created_at: 'datetime:ruby_date' })).toEqual(true)
      })

      it ('returns false when detecting an invalid ruby_date', () => {
        expect(validate({ created_at: 'Mon Jan 22 15:04:05' }, { created_at: 'datetime:ruby_date' })).toEqual(false)
      })
    })

    context ('stamp decorator is passed', () => {
      it ('returns true when detecting a valid stamp', () => {
        expect(validate({ created_at: 'Aug 20 07:40:43' }, { created_at: 'datetime:stamp' })).toEqual(true)
      })

      it ('returns false when detecting an invalid stamp', () => {
        expect(validate({ created_at: 'Mon Jan 22 15:04:05' }, { created_at: 'datetime:stamp' })).toEqual(false)
      })
    })

    context ('stamp_micro decorator is passed', () => {
      it ('returns true when detecting a valid stamp_micro', () => {
        expect(validate({ created_at: 'Aug 20 07:45:26.087422' }, { created_at: 'datetime:stamp_micro' })).toEqual(true)
      })

      it ('returns false when detecting an invalid stamp_micro', () => {
        expect(validate({ created_at: 'Mon Jan 22 15:04:05' }, { created_at: 'datetime:stamp_micro' })).toEqual(false)
      })
    })

    context ('stamp_milli decorator is passed', () => {
      it ('returns true when detecting a valid stamp_milli', () => {
        expect(validate({ created_at: 'Aug 20 07:43:36.680' }, { created_at: 'datetime:stamp_milli' })).toEqual(true)
      })

      it ('returns false when detecting an invalid stamp_milli', () => {
        expect(validate({ created_at: 'Mon Jan 22 15:04:05' }, { created_at: 'datetime:stamp_milli' })).toEqual(false)
      })
    })

    context ('stamp_nano decorator is passed', () => {
      it ('returns true when detecting a valid stamp_nano', () => {
        expect(validate({ created_at: 'Aug 20 07:47:27.520037000' }, { created_at: 'datetime:stamp_nano' })).toEqual(true)
      })

      it ('returns false when detecting an invalid stamp_nano', () => {
        expect(validate({ created_at: 'Mon Jan 22 15:04:05' }, { created_at: 'datetime:stamp_nano' })).toEqual(false)
      })
    })

    context ('unix decorator is passed', () => {
      it ('returns true when detecting a valid unix', () => {
        expect(validate({ created_at: 'Sat Aug 20 07:06:22 PDT 2022' }, { created_at: 'datetime:unix' })).toEqual(true)
        expect(validate({ created_at: 'Sat Aug 20 07:06:22 PDT 2022' }, { created_at: 'datetime:unix_date' })).toEqual(true)
      })

      it ('returns false when detecting an invalid unix', () => {
        expect(validate({ created_at: 'Mon Jan 22 15:04:05' }, { created_at: 'datetime:unix' })).toEqual(false)
        expect(validate({ created_at: 'Mon Jan 22 15:04:05' }, { created_at: 'datetime:unix_date' })).toEqual(false)
      })
    })
  })
})
