import * as Recorder from './Recorder'

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

  it('should create an action to resume', () => {
    const expectedAction = {
      type: 'RESUME_VOLUMEMETER'
    }
    expect(Recorder.resume()).toEqual(expectedAction)
  })

  it('should create an action to suspend', () => {
    const expectedAction = {
      type: 'SUSPEND_VOLUMEMETER'
    }
    expect(Recorder.suspend()).toEqual(expectedAction)
  })
})
