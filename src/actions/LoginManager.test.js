import * as LoginManager from './LoginManager'

describe('actions LoginManager', () => {
  it('should create an action to login', () => {
    const user = {
      fbid: 1,
      email: 'test',
      name: 'test',
      hasivector: 'test'
    }
    const expectedAction = {
      type: 'LOGIN',
      ...user
    }
    expect(LoginManager.login(user)).toEqual(expectedAction)
  })

  it('should create an action to logout', () => {
    const expectedAction = {
      type: 'LOGOUT'
    }
    expect(LoginManager.logout()).toEqual(expectedAction)
  })

  it('should create an action to UPDATE_STATUS', () => {
    const expectedAction = {
      type: 'UPDATE_STATUS',
      hasivector: false,
      processing: false
    }
    expect(LoginManager.update_status(false, false)).toEqual(expectedAction)
  })
})
