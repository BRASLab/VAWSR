import * as ASR from './ASR'
import * as LoginManager from './LoginManager'
import * as Recorder from './Recorder'

describe('actions', () => {
  it('should create an action to SpeakerRecognition', () => {
    const expired = new Date()
    const expectedAction = {
      type: 'SPEAKER_RECOGNITION',
      expired
    }
    expect(ASR.SpeakerRecognition(expired)).toEqual(expectedAction)
  })

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
