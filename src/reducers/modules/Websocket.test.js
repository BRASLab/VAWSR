import Websocket from './Websocket'

describe('Websocket reducer', () => {
  const initialState = {
    connected: false,
    responses: [],
    google: '',
    kaldi: ''
  }
  it('should return the initial state', () => {
    expect(Websocket(undefined, {})).toEqual(initialState)
  })

  it('should handle ON_CONNECT', () => {
    expect(
      Websocket(undefined, {
        type: 'ON_CONNECT'
      })
    ).toEqual({ ...initialState, connected: true })
  })

  it('should handle TRANSCRIPT_GOOGLE', () => {
    expect(
      Websocket(undefined, {
        type: 'TRANSCRIPT_GOOGLE',
        transcript_google: 'test'
      })
    ).toEqual({ ...initialState, google: 'test' })
  })

  it('should handle TRANSCRIPT_KALDI', () => {
    expect(
      Websocket(undefined, {
        type: 'TRANSCRIPT_KALDI',
        transcript_kaldi: 'test'
      })
    ).toEqual({ ...initialState, kaldi: 'test' })
  })

  it('should handle STOP_STREAM', () => {
    const proba = 0.8
    const result = {
      text: '123',
      url: '456'
    }
    const expectedState = {
      ...initialState,
      responses: [{ google: '', kaldi: '', proba, ...result }]
    }
    expect(
      Websocket(undefined, {
        type: 'STOP_STREAM',
        proba,
        ...result
      })
    ).toEqual(expectedState)
  })
})
