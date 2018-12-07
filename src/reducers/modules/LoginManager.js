const LoginManager = (
  state = { logined: false, hasivector: false, processing: false },
  action
) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        fbid: action.fbid,
        email: action.email,
        name: action.name,
        logined: true,
        processing: action.processing,
        hasivector: action.hasivector
      }
    case 'LOGOUT':
      return { logined: false, hasivector: false, processing: false }

    case 'UPDATE_STATUS':
      return {
        ...state,
        processing: action.processing ? action.processing : state.processing,
        hasivector: action.hasivector ? action.hasivector : state.hasivector
      }

    default:
      return state
  }
}

export default LoginManager
