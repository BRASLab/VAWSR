import ASR from './ASR'
import LoginManager from './LoginManager'
import Recorder from './Recorder'
import Host from './Host'

describe('ASR reducer', () => {
  it('should return the initial state', () => {
    const initialState = { verified: false }
    expect(ASR(undefined, {})).toEqual(initialState)
  })

  it('should handle SPEAKER_RECONGNITION', () => {
    const expired = new Date()
    expect(
      ASR([], {
        type: 'SPEAKER_RECONGNITION',
        expired
      })
    ).toEqual({
      verified: true,
      expired
    })
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
  it('should retrun inital state', () => {
    const initialState = { record: false }
    expect(Recorder(undefined, {})).toEqual(initialState)
  })

  it('should handle UPDATE_STREAM', () => {
    expect(Recorder(undefined, { type: 'UPDATE_STREAM', stream })).toEqual({
      record: false,
      stream
    })
  })

  it('should handle START_RECORD', () => {
    expect(Recorder({ stream }, { type: 'START_RECORD' })).toEqual({
      record: true,
      stream
    })
  })

  it('should handle STOP_RECORD', () => {
    expect(Recorder({ stream }, { type: 'STOP_RECORD' })).toEqual({
      record: false,
      stream
    })
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
