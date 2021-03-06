export const on_connect = () => {
  return {
    type: 'ON_CONNECT'
  }
}

export const update_google = transcript_google => {
  return {
    type: 'TRANSCRIPT_GOOGLE',
    transcript_google
  }
}

export const update_kaldi = transcript_kaldi => {
  return {
    type: 'TRANSCRIPT_KALDI',
    transcript_kaldi
  }
}

export const stop_stream = (google, kaldi, proba, { text, url }) => {
  return {
    type: 'STOP_STREAM',
    google,
    kaldi,
    proba,
    text,
    url
  }
}

export const clear_responses = () => {
  return {
    type: 'CLEAR_RESPONSES'
  }
}
