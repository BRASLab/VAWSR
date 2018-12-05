import * as Websocket from './Websocket'

describe('actions Websocket', () => {
  it('should create an action to Websocket on_connect', () => {
    const expectedAction = {
      type: 'ON_CONNECT'
    }
    expect(Websocket.on_connect()).toEqual(expectedAction)
  })

  it('should create an action to Websocket TRANSCRIPT_GOOGLE', () => {
    const transcript_google = 'test'
    const expectedAction = {
      type: 'TRANSCRIPT_GOOGLE',
      transcript_google
    }
    expect(Websocket.update_google(transcript_google)).toEqual(expectedAction)
  })

  it('should create an action to Websocket TRANSCRIPT_KALDI', () => {
    const transcript_kaldi = 'test'
    const expectedAction = {
      type: 'TRANSCRIPT_KALDI',
      transcript_kaldi
    }
    expect(Websocket.update_kaldi(transcript_kaldi)).toEqual(expectedAction)
  })

  it('should create an action to Websocket STOP_STREAM', () => {
    const proba = 0.8
    const google = 'google'
    const kaldi = 'kaldi'
    const result = { text: '123', url: '456' }
    const expectedAction = {
      type: 'STOP_STREAM',
      google,
      kaldi,
      proba,
      ...result
    }
    expect(Websocket.stop_stream(google, kaldi, proba, result)).toEqual(
      expectedAction
    )
  })

  it('should create an action to Websocket CLEAR_RESPONSES', () => {
    expect(Websocket.clear_responses()).toEqual({ type: 'CLEAR_RESPONSES' })
  })
})
