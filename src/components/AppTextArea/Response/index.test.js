import React from 'react'
import Response from './index.js'
jest.mock('@fortawesome/react-fontawesome', () => {
  return {
    FontAwesomeIcon: jest.fn(() => <div />)
  }
})
import { mount } from 'enzyme'

describe('component <Response />', () => {
  it('renders without crashing', () => {
    mount(
      <Response
        google={'google'}
        kaldi={'kaldi'}
        proba={0.8}
        result={'result'}
      />
    ).debug()
  })
})
