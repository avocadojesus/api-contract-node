import validate from '../../src/validate'

describe ('validate', () => {
  it ('returns true when detecting a valid number', () => {
    expect(validate({ cost: 123 }, { cost: 'number' })).toEqual(true)
    expect(validate({ cost: 123.456 }, { cost: 'number' })).toEqual(true)
  })

  it ('returns false when detecting an invalid number', () => {
    expect(validate({ cost: true }, { cost: 'number' })).toEqual(false)
    expect(validate({ cost: [1] }, { cost: 'number' })).toEqual(false)
  })

  context ('with array type', () => {
    it ('returns true when detecting a valid number array', () => {
      expect(validate({ cost: [1] }, { cost: 'number[]' })).toEqual(true)
    })

    it ('returns false when detecting an invalid number array', () => {
      expect(validate({ cost: [true] }, { cost: 'number[]' })).toEqual(false)
    })
  })

  context ('decorators', () => {
    context ('int decorator is passed', () => {
      it ('returns true when detecting a valid int', () => {
        expect(validate({ id: 123 }, { id: 'number:int' })).toEqual(true)
      })

      it ('returns false when detecting an invalid int', () => {
        expect(validate({ id: '986F-421A-8A33-130A701017AD' }, { id: 'number:int' })).toEqual(false)
      })
    })

    context ('bigint decorator is passed', () => {
      it ('returns true when detecting a valid bigint', () => {
        expect(validate({ id: 123 }, { id: 'number:bigint' })).toEqual(true)
      })

      it ('returns false when detecting an invalid bigint', () => {
        expect(validate({ id: '986F-421A-8A33-130A701017AD' }, { id: 'number:bigint' })).toEqual(false)
      })
    })

    context ('float decorator is passed', () => {
      it ('returns true when detecting a valid float', () => {
        expect(validate({ id: 123.456 }, { id: 'number:float' })).toEqual(true)
      })

      it ('returns false when detecting an invalid float', () => {
        expect(validate({ id: 123 }, { id: 'number:float' })).toEqual(false)
      })
    })
  })
})

