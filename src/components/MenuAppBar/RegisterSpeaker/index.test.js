jest.mock('./Record')
jest.mock('react-toastify')
import React from 'react'
import Index, { RegisterSpeaker } from './index'
import { mount, shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'
import MenuItem from '@material-ui/core/MenuItem'
import axios from 'axios'
import { promiseDelay, range } from '../../../utils'
import { toast } from 'react-toastify'

describe('component <RegisterSpeaker />', () => {
  let app
  let classes = {
    appBar: 'testAppBar',
    buttonProgress: 'testbuttonProgress',
    flex: 'testFlex',
    button: 'testButton'
  }
  let callback = jest.fn()
  let hostname = ''
  const middlewares = []
  const mockStore = configureStore(middlewares)
  let initialState
  let store
  let mock = new MockAdapter(axios)

  it('renders without crashing', () => {
    initialState = {
      LoginManager: { hasivector: false },
      Host: { hostname: hostname }
    }
    store = mockStore(initialState)
    expect(
      mount(
        <Provider store={store}>
          <Index callback={callback} />
        </Provider>
      )
        .find(MenuItem)
        .text()
    ).toBe('語者設定')

    jest.mock('@material-ui/core/styles')
    app = shallow(
      <RegisterSpeaker
        hasivector={true}
        hostname={hostname}
        classes={classes}
        callback={callback}
      />
    )
    expect(app.find('p').text()).toBe('重新註冊語者')
  })

  it('should handle handleBack', () => {
    let callback2 = jest.fn()
    let app2 = shallow(
      <RegisterSpeaker
        hasivector={true}
        hostname={hostname}
        classes={classes}
        callback={callback2}
      />
    )
    app2.instance().handleNext()
    app2.instance().handleBack()
    app2.instance().handleBack()
    expect(callback2).toBeCalled()
  })

  it('should handle generateSentences failed', async () => {
    let error = 'test'
    mock.onGet(`${hostname}/sentences.json`).reply(401, error)
    app.instance().generateSentences()
    await promiseDelay(100)
    expect(toast.error).toBeCalledWith('取得語料失敗，請檢查登入是否過期')
  })

  it('should handle handleClick && generateSentences', async () => {
    let sentences = range(10, true)
    mock.onGet(`${hostname}/sentences.json`).reply(200, { sentences })
    app.find(MenuItem).simulate('click')
    await promiseDelay(100)
    expect(app.state('sentences')).toEqual(sentences)
  })

  it('should handle handleURL && handleNext', () => {
    const blob = new Blob()
    for (let i = 0; i < 9; i++) {
      app.instance().handleURL(blob)
      expect(app.state().audioBlob[String(i)]).toEqual(blob)
      app.instance().handleNext()
    }
    app.instance().handleURL(new Blob())
    expect(app.state().audioBlob['9']).toEqual(blob)
  })

  it('should handle replayBlob', () => {
    let mockPlay = jest.fn()
    window.Audio = jest.fn(() => {
      return { play: mockPlay }
    })
    window.URL.createObjectURL = jest.fn()
    app.instance().replayBlob()
    expect(window.URL.createObjectURL).toBeCalled()
    expect(mockPlay).toBeCalled()
  })

  it('should handle registerspeaker failed', async () => {
    mock.onPost(`${hostname}/registerspeaker`).reply(401, {})
    app.instance().handleNext()
    await promiseDelay(100)
    expect(toast.error).toBeCalledWith('語者註冊失敗，請重新傳送一遍')
  })

  it('should handle registerspeaker successed', async () => {
    mock.onPost(`${hostname}/registerspeaker`).reply(200, {})
    app.instance().handleNext()
    await promiseDelay(100)
    expect(toast.success).toBeCalledWith('語者註冊成功')
  })
})
