import LoginManager from './LoginManager'

describe('LoginManager reducer', () => {
  const initialState = {
    logined: false,
    hasivector: false,
    processing: false
  }
  it('should retrun inital state', () => {
    expect(LoginManager(undefined, {})).toEqual(initialState)
  })

  it('should handle LOGIN', () => {
    const action = {
      fbid: 1,
      email: 'test',
      name: 'test',
      hasivector: false,
      processing: false
    }
    expect(
      LoginManager(undefined, Object.assign({ type: 'LOGIN' }, action))
    ).toEqual({
      logined: true,
      ...action
    })
  })

  it('should handle LOGOUT', () => {
    expect(LoginManager({ logined: true }, { type: 'LOGOUT' })).toEqual({
      logined: false,
      hasivector: false,
      processing: false
    })
  })
})
