const Websocket = (
  state = { connected: false, responses: [], google: '', kaldi: '' },
  action
) => {
  switch (action.type) {
    case 'ON_CONNECT':
      return {
        ...state,
        connected: true
      }
    case 'TRANSCRIPT_GOOGLE':
      return {
        ...state,
        google: action.transcript_google
      }
    case 'TRANSCRIPT_KALDI':
      return {
        ...state,
        kaldi: action.transcript_kaldi
      }
    case 'STOP_STREAM':
      state.responses.push({
        google: state.google,
        kaldi: state.kaldi,
        proba: action.proba,
        text: action.text,
        url: action.url
      })
      return {
        ...state,
        google: '',
        kaldi: ''
      }
    default:
      return state
  }
}

export default Websocket
