export const login = user => {
  return {
    type: 'LOGIN',
    fbid: user.fbid,
    email: user.email,
    name: user.name
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}
