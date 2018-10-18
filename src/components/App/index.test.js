jest.mock('../VolumeMeter/index.js', () => jest.fn())
jest.mock('../MenuAppBar/index.js', () => jest.fn())
import React from 'react'
import App from './index.js'
import { shallow } from 'enzyme'

describe('component <App />', () => {
  it('renders without crashing', () => {
    shallow(<App />)
  })
})
