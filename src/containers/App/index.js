import React, { Component } from 'react'
import styled from 'styled-components'
import VolumeMeter from '../VolumeMeter'

const AppWrapper = styled.div`
  text-align: center;
  margin: 0px auto;
  width: 80%;
`
const AppTextArea = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  background: #eee;
`

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <AppTextArea />
        <VolumeMeter />
      </AppWrapper>
    )
  }
}

export default App
