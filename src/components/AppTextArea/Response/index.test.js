import React from 'react'
import Response from './index.js'
import TextField from '@material-ui/core/TextField'

jest.mock('@fortawesome/react-fontawesome', () => {
  return {
    FontAwesomeIcon: jest.fn(() => <div />)
  }
})
import { mount } from 'enzyme'

describe('component <Response />', () => {
  let app
  let url = 'https://example.com'
  it('renders without crashing', () => {
    app = mount(
      <Response
        google={'google'}
        kaldi={'kaldi'}
        proba={0.8}
        text={'text'}
        url={url}
      />
    )
  })

  it('handle method handleClick', () => {
    window.open = jest.fn()
    app
      .find(TextField)
      .at(2)
      .simulate('click')
    expect(window.open).toBeCalledWith(url, '_blank')
  })
})
