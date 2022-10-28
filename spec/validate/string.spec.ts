import validate from '../../src/validate'

describe ('validate', () => {
  it ('returns true when detecting a valid string', () => {
    expect(validate({ name: 'fred' }, { name: 'string' })).toEqual(true)
  })

  it ('returns false when detecting an invalid string', () => {
    expect(validate({ name: true }, { name: 'string' })).toEqual(false)
    expect(validate({ name: ['fred'] }, { name: 'string' })).toEqual(false)
  })

  context ('with array type', () => {
    it ('returns true when detecting a valid string array', () => {
      expect(validate({ name: ['fred'] }, { name: 'string[]' })).toEqual(true)
    })

    it ('returns false when detecting an invalid string array', () => {
      expect(validate({ name: [true] }, { name: 'string[]' })).toEqual(false)
    })
  })

  context ('decorators', () => {
    context ('optional decorator is passed', () => {
      it ('returns true when null is passed', () => {
        expect(validate({ name: null }, { name: 'string:optional' })).toEqual(true)
      })

      it ('returns true when undefined is passed', () => {
        expect(validate({ name: undefined }, { name: 'string:optional' })).toEqual(true)
      })

      it ('returns false when detecting an invalid number', () => {
        expect(validate({ name: 123 }, { name: 'string:optional' })).toEqual(false)
      })
    })

    context ('uuid decorator is passed', () => {
      it ('returns true when detecting a valid uuid', () => {
        expect(validate({ id: '233B5C32-986F-421A-8A33-130A701017AD' }, { id: 'string:uuid' })).toEqual(true)
      })

      it ('returns false when detecting an invalid uuid', () => {
        expect(validate({ id: '986F-421A-8A33-130A701017AD' }, { id: 'string:uuid' })).toEqual(false)
      })
    })

    context ('email decorator is passed', () => {
      it ('returns true when detecting a valid name', () => {
        expect(validate({ email: "fred@fred.fred" }, { email: 'string:email' })).toEqual(true)
      })

      it ('returns false when detecting an invalid name', () => {
        expect(validate({ email: 'coolidge' }, { email: 'string:email' })).toEqual(false)
      })
    })

    context ('name decorator is passed', () => {
      it ('returns true when detecting a valid name', () => {
        expect(validate({ name: 'Fredward' }, { name: 'string:name' })).toEqual(true)
      })

      it ('returns false when detecting an invalid name', () => {
        expect(validate({ name: false }, { name: 'string:name' })).toEqual(false)
      })
    })

    context ('fullname decorator is passed', () => {
      it ('returns true when detecting a valid name', () => {
        expect(validate({ name: "Fredward Mc. O'Fish" }, { name: 'string:fullname' })).toEqual(true)
      })

      it ('returns false when detecting an invalid name', () => {
        expect(validate({ name: false }, { name: 'string:fullname' })).toEqual(false)
      })
    })

    context ('enum decorator is passed', () => {
      it ('returns true when detecting a valid enum value', () => {
        expect(validate({ type: 'cool' }, { type: 'string:enum{cool notcool}' })).toEqual(true)
      })

      it ('returns false when detecting an invalid name', () => {
        expect(validate({ type: 'uncool' }, { type: 'string:enum{cool notcool}' })).toEqual(false)
      })
    })
  })
})

