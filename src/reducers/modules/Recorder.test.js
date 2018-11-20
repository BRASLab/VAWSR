import Recorder from './Recorder'

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
