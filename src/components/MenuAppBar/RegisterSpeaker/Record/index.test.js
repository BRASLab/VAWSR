import React from 'react'
import Record from './index.js'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import msr from 'msr'

jest.mock('msr')

describe('component <Record />', () => {
  let handleURL
  let record
  let button
  let mockInstance
  let blob = 'test'

  const middlewares = []
  const mockStore = configureStore(middlewares)
  const initialState = {
    Recorder: { stream: {} }
  }
  const store = mockStore(initialState)

  const mockStart = jest.fn()
  const mockStop = jest.fn(() => {
    mockInstance.ondataavailable(blob)
  })

  it('renders without crashing', () => {
    const classes = {
      record: 'test',
      button: 'test_button'
    }
    handleURL = jest.fn()
    record = mount(
      <Provider store={store}>
        <Record classes={classes} handleURL={handleURL} />
      </Provider>
    )
    mockInstance = msr.mock.instances[0]
    mockInstance.start = mockStart
    mockInstance.stop = mockStop
    expect(msr).toHaveBeenCalled()
  })

  it('start button click', () => {
    button = record.find('.test_button').first()
    button.simulate('click')
    expect(mockStart).toBeCalledWith(100000)
  })

  it('stop button click', () => {
    button = record.find('.test_button').first()
    button.simulate('click')
    expect(mockStop).toBeCalled()
  })

  it('handleURL should be called', () => {
    expect(handleURL).toBeCalledWith(blob)
  })
})
