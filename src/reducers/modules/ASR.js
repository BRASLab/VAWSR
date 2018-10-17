const ASR = (state = { verified: false }, action) => {
  switch (action.type) {
    case 'SPEAKER_RECONGNITION':
      return {
        verified: true,
        expired: action.expired
      }
    default:
      return state
  }
}

export default ASR
