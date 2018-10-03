const FacebookLoginManager = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        id: action.id,
        email: action.email,
        token: action.token,
        name: action.name,
        url: action.url
      }
    case 'LOGOUT':
      return {}

    default:
      return state
  }
}

export default FacebookLoginManager
