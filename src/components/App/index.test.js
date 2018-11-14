import React from 'react'
import App from './index.js'
import { shallow } from 'enzyme'

describe('component <App />', () => {
  it('renders without crashing', () => {
    shallow(<App />)
  })
})
