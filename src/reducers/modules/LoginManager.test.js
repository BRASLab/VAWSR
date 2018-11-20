import LoginManager from './LoginManager'

describe('LoginManager reducer', () => {
  it('should retrun inital state', () => {
    const initialState = { logined: false }
    expect(LoginManager(undefined, {})).toEqual(initialState)
  })

  it('should handle LOGIN', () => {
    const action = {
      fbid: 1,
      email: 'test',
      name: 'test',
      hasivector: false
    }
    expect(
      LoginManager(undefined, Object.assign({ type: 'LOGIN' }, action))
    ).toEqual({
      logined: true,
      ...action
    })
  })

  it('should handle LOGOUT', () => {
    expect(LoginManager(undefined, { type: 'LOGOUT' })).toEqual({
      logined: false
    })
  })
})
