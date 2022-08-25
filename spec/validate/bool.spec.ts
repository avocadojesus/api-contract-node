import validate from '../../src/validate'

describe ('validate', () => {
  it ('returns true when detecting a valid boolean', () => {
    expect(validate({ likes_cats: true }, { likes_cats: 'bool' })).toEqual(true)
    expect(validate({ likes_cats: false }, { likes_cats: 'bool' })).toEqual(true)
  })

  it ('returns false when detecting an invalid boolean', () => {
    expect(validate({ likes_cats: 'true' }, { likes_cats: 'bool' })).toEqual(false)
    expect(validate({ likes_cats: 'false' }, { likes_cats: 'bool' })).toEqual(false)
    expect(validate({ likes_cats: [true] }, { likes_cats: 'bool' })).toEqual(false)
    expect(validate({ likes_cats: [false] }, { likes_cats: 'bool' })).toEqual(false)
  })

  context ('with array type', () => {
    it ('returns true when detecting a valid boolean array', () => {
      expect(validate({ likes_cats: [true] }, { likes_cats: 'bool[]' })).toEqual(true)
      expect(validate({ likes_cats: [false] }, { likes_cats: 'bool[]' })).toEqual(true)
    })

    it ('returns false when detecting an invalid boolean array', () => {
      expect(validate({ likes_cats: ['true'] }, { likes_cats: 'bool[]' })).toEqual(false)
      expect(validate({ likes_cats: ['false'] }, { likes_cats: 'bool[]' })).toEqual(false)
    })
  })
})

