import * as Websocket from './Websocket'
import * as LoginManager from './LoginManager'
import * as Recorder from './Recorder'

describe('actions LoginManager', () => {
  it('should create an action to login', () => {
    const user = {
      fbid: 1,
      email: 'test',
      name: 'test',
      hasivector: 'test'
    }
    const expectedAction = {
      type: 'LOGIN',
      ...user
    }
    expect(LoginManager.login(user)).toEqual(expectedAction)
  })

  it('should create an action to logout', () => {
    const expectedAction = {
      type: 'LOGOUT'
    }
    expect(LoginManager.logout()).toEqual(expectedAction)
  })
})

describe('actions Recorder', () => {
  it('should create an action to startRecord', () => {
    const expectedAction = {
      type: 'START_RECORD'
    }
    expect(Recorder.startRecord()).toEqual(expectedAction)
  })

  it('should create an action to stopRecord', () => {
    const expectedAction = {
      type: 'STOP_RECORD'
    }
    expect(Recorder.stopRecord()).toEqual(expectedAction)
  })

  it('should create an action to updateStream', () => {
    const stream = {}
    const expectedAction = {
      type: 'UPDATE_STREAM',
      stream
    }
    expect(Recorder.updateStream(stream)).toEqual(expectedAction)
  })
})

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
    const result = ''
    const expectedAction = {
      type: 'STOP_STREAM',
      proba,
      result
    }
    expect(Websocket.stop_stream(proba, result)).toEqual(expectedAction)
  })
})
