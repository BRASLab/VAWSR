const Recorder = (state = { record: false }, action) => {
  switch (action.type) {
    case 'UPDATE_STREAM':
      return Object.assign({}, state, { stream: action.stream })
    case 'START_RECORD':
      return Object.assign({}, state, { record: true })
    case 'STOP_RECORD':
      return Object.assign({}, state, { record: false })

    default:
      return state
  }
}

export default Recorder
