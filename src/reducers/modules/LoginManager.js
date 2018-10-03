const LoginManager = (state = { login: false }, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        fbid: action.fbid,
        email: action.email,
        name: action.name,
        login: true
      }
    case 'LOGOUT':
      return { login: false }

    default:
      return state
  }
}

export default LoginManager
