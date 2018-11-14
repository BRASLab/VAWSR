const Recorder = (state = { record: false, suspended: false }, action) => {
  switch (action.type) {
    case 'UPDATE_STREAM':
      return { ...state, stream: action.stream }
    case 'START_RECORD':
      return { ...state, record: true }
    case 'STOP_RECORD':
      return { ...state, record: false }
    case 'SUSPEND_VOLUMEMETER':
      return { ...state, suspended: true }
    case 'RESUME_VOLUMEMETER':
      return { ...state, suspended: false }
    default:
      return state
  }
}

export default Recorder
