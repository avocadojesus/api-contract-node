import validate from '../../src/validate'

describe ('validate', () => {
  it ('returns true when detecting a valid custom type', () => {
    expect(
      validate(
        { user: { id: 1 } },
        { user: 'User' },
        {
          serializers: {
            User: {
              id: 'number'
            }
          }
        }
      )
    ).toEqual(true)
  })

  it ('returns false when detecting an invalid boolean', () => {
    expect(
      validate(
        { user: { id: '1' } },
        { user: 'User' },
        {
          serializers: {
            User: {
              id: 'number'
            }
          }
        }
      )
    ).toEqual(false)
  })

  context ('with array type', () => {
    it ('returns true when detecting a valid custom type array', () => {
      expect(
        validate(
          { users: [
            { id: 1 },
            { id: 2 },
          ] },
          { users: 'User[]' },
          {
            serializers: {
              User: {
                id: 'number'
              }
            }
          }
        )
      ).toEqual(true)
    })

    it ('returns false when detecting an invalid boolean array', () => {
      expect(
        validate(
          { users: [
            { id: '1' },
            { id: 2 },
          ] },
          { users: 'User[]' },
          {
            serializers: {
              User: {
                id: 'number'
              }
            }
          }
        )
      ).toEqual(false)
    })
  })
})

