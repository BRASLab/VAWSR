const LoginManager = (
  state = { logined: false, hasivector: false },
  action
) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        fbid: action.fbid,
        email: action.email,
        name: action.name,
        logined: true,
        hasivector: action.hasivector
      }
    case 'LOGOUT':
      return { logined: false, hasivector: false }

    default:
      return state
  }
}

export default LoginManager
