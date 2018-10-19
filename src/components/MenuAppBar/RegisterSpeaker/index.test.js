jest.mock('./Record')
jest.mock('react-toastify')
jest.mock('@material-ui/core/Dialog', () => jest.fn(() => <div />))
import React from 'react'
import RegisterSpeaker from './index'
import { createMount } from '@material-ui/core/test-utils'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import mockAxios from 'axios'

jest.mock('axios')

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

describe('component <RegisterSpeaker />', () => {
  let mount = createMount()
  let app
  let callback = jest.fn()
  let hostname = 'https://test'
  const middlewares = []
  const mockStore = configureStore(middlewares)
  let initialState
  let store
  it('renders without crashing', () => {
    initialState = {
      LoginManager: { hasivector: false },
      Host: { hostname: hostname }
    }
    store = mockStore(initialState)
    expect(
      mount(
        <Provider store={store}>
          <RegisterSpeaker callback={callback} />
        </Provider>
      )
        .find('li')
        .text()
    ).toBe('語者設定')
    initialState = {
      LoginManager: { hasivector: true },
      Host: { hostname: hostname }
    }
    store = mockStore(initialState)
    app = mount(
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <RegisterSpeaker callback={callback} />
        </MuiThemeProvider>
      </Provider>
    )
    expect(app.find('li').text()).toBe('重新註冊語者')
  })

  it('should handle handleClick && generateSentences', () => {
    mockAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({
        data: { sentences: ['1', '2', '3'] }
      })
    })
    app.find('li').simulate('click')
    console.log(app)
  })
})
