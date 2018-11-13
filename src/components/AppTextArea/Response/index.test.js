import React from 'react'
import Response from './index.js'
import { shallow } from 'enzyme'

describe('component <App />', () => {
  it('renders without crashing', () => {
    shallow(
      <Response
        google={'google'}
        kaldi={'kaldi'}
        proba={0.8}
        result={'result'}
      />
    )
  })
})
