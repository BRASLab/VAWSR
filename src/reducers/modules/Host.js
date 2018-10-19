const Host = (state = { hostname: 'https://vawsr.mino.tw' }, action) => {
  switch (action.type) {
    case 'CHANGE_HOST':
      return Object.assign({}, state, { hostname: action.hostname })
    default:
      return state
  }
}

export default Host
