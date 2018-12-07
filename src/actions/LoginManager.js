export const login = user => {
  return {
    type: 'LOGIN',
    fbid: user.fbid,
    email: user.email,
    name: user.name,
    hasivector: user.hasivector,
    processing: user.processing
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

export const update_status = (hasivector, processing) => {
  return {
    type: 'UPDATE_STATUS',
    hasivector,
    processing
  }
}
