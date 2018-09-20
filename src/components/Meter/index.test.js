import React from 'react'
import ReactDOM from 'react-dom'
import Index from './index.js'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Index threshold={50} width={10} handleMouse={() => true} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
