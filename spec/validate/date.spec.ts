import validate from '../../src/validate'

describe ('validate', () => {
  it ('returns true when detecting a valid date', () => {
    expect(validate({ created_at: '2000-01-01' }, { created_at: 'date' })).toEqual(true)
  })

  it ('returns false when detecting an invalid date', () => {
    expect(validate({ created_at: '20000-01-01' }, { created_at: 'date' })).toEqual(false)
    expect(validate({ created_at: ['2000-01-01'] }, { created_at: 'date' })).toEqual(false)
  })

  context ('with array type', () => {
    it ('returns true when detecting a valid date array', () => {
      expect(validate({ created_at: ['2000-01-01'] }, { created_at: 'date[]' })).toEqual(true)
    })

    it ('returns false when detecting an invalid date array', () => {
      expect(validate({ created_at: [1] }, { created_at: 'date[]' })).toEqual(false)
      expect(validate({ created_at: '2000-01-01' }, { created_at: 'date[]' })).toEqual(false)
    })
  })

  context ('decorators', () => {
    context ('yyyymmdd decorator is passed', () => {
      it ('returns true when detecting a valid yyyymmdd', () => {
        expect(validate({ created_at: '2000-01-01' }, { created_at: 'date:yyyymmdd' })).toEqual(true)
      })

      it ('returns false when detecting an invalid yyyymmdd', () => {
        expect(validate({ created_at: '00-01-01' }, { created_at: 'date:yyyymmdd' })).toEqual(false)
      })
    })

    context ('yymmdd decorator is passed', () => {
      it ('returns true when detecting a valid yymmdd', () => {
        expect(validate({ created_at: '00-01-01' }, { created_at: 'date:yymmdd' })).toEqual(true)
      })

      it ('returns false when detecting an invalid yymmdd', () => {
        expect(validate({ created_at: '2000-01-01' }, { created_at: 'date:yymmdd' })).toEqual(false)
      })
    })

    context ('mmddyyyy decorator is passed', () => {
      it ('returns true when detecting a valid mmddyyyy', () => {
        expect(validate({ created_at: '01-01-2000' }, { created_at: 'date:mmddyyyy' })).toEqual(true)
      })

      it ('returns false when detecting an invalid mmddyyyy', () => {
        expect(validate({ created_at: '01-01-00' }, { created_at: 'date:mmddyyyy' })).toEqual(false)
      })
    })

    context ('mmddyy decorator is passed', () => {
      it ('returns true when detecting a valid mmddyy', () => {
        expect(validate({ created_at: '01-01-00' }, { created_at: 'date:mmddyy' })).toEqual(true)
      })

      it ('returns false when detecting an invalid mmddyy', () => {
        expect(validate({ created_at: '01-01-2000' }, { created_at: 'date:mmddyy' })).toEqual(false)
      })
    })
  })
})
