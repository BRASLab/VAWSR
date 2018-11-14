import Websocket from './Websocket'
import LoginManager from './LoginManager'
import Recorder from './Recorder'
import Host from './Host'

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
    const result = ''
    const expectedState = {
      ...initialState,
      responses: [{ google: '', kaldi: '', proba, result }]
    }
    expect(
      Websocket(undefined, {
        type: 'STOP_STREAM',
        proba,
        result
      })
    ).toEqual(expectedState)
  })
})

describe('LoginManager reducer', () => {
  it('should retrun inital state', () => {
    const initialState = { logined: false }
    expect(LoginManager(undefined, {})).toEqual(initialState)
  })

  it('should handle LOGIN', () => {
    const action = {
      fbid: 1,
      email: 'test',
      name: 'test',
      hasivector: false
    }
    expect(
      LoginManager(undefined, Object.assign({ type: 'LOGIN' }, action))
    ).toEqual({
      logined: true,
      ...action
    })
  })

  it('should handle LOGOUT', () => {
    expect(LoginManager(undefined, { type: 'LOGOUT' })).toEqual({
      logined: false
    })
  })
})

describe('Recorder reducer', () => {
  const stream = { test: 'test' }
  let initialState = { record: false, suspended: false }
  it('should retrun inital state', () => {
    expect(Recorder(undefined, {})).toEqual(initialState)
  })

  it('should handle UPDATE_STREAM', () => {
    expect(Recorder(undefined, { type: 'UPDATE_STREAM', stream })).toEqual({
      ...initialState,
      stream
    })
  })

  it('should handle START_RECORD', () => {
    expect(
      Recorder({ stream, ...initialState }, { type: 'START_RECORD' })
    ).toEqual({
      ...initialState,
      record: true,
      stream
    })
  })

  it('should handle STOP_RECORD', () => {
    expect(
      Recorder({ stream, ...initialState }, { type: 'STOP_RECORD' })
    ).toEqual({
      ...initialState,
      record: false,
      stream
    })
  })

  it('should handle SUSPEND_VOLUMEMETER', () => {
    expect(Recorder(undefined, { type: 'SUSPEND_VOLUMEMETER' })).toEqual({
      ...initialState,
      suspended: true
    })
  })

  it('should handle RESUME_VOLUMEMETER', () => {
    expect(
      Recorder(
        { ...initialState, suspended: true },
        {
          type: 'RESUME_VOLUMEMETER'
        }
      )
    ).toEqual({ ...initialState })
  })
})

describe('Host reducer', () => {
  it('should retrun inital state', () => {
    const initialState = { hostname: 'https://vawsr.mino.tw' }
    expect(Host(undefined, {})).toEqual(initialState)
  })

  it('should handle CHANGE_HOST', () => {
    const action = {
      type: 'CHANGE_HOST',
      hostname: 'https://test'
    }
    expect(Host(undefined, action)).toEqual({
      hostname: 'https://test'
    })
  })
})
