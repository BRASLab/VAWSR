import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
jest.mock('./Response')
import AppTextArea from './index.js'

describe('component <AppTextArea />', () => {
  const middlewares = []
  const mockStore = configureStore(middlewares)
  const initialState = {
    Websocket: {
      google: 'google',
      kaldi: 'kaldi',
      responses: [
        {
          google: 'google',
          kaldi: 'kaldi',
          proba: 0.8,
          result: 'result'
        }
      ]
    }
  }
  let store = mockStore(initialState)
  it('renders without crashing', () => {
    mount(
      <Provider store={store}>
        <AppTextArea />
      </Provider>
    )
  })
})
