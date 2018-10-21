import React, { Component } from 'react'
import styled from 'styled-components'
import VolumeMeter from '../VolumeMeter'
import MenuAppBar from '../MenuAppBar'
import Footer from '../Footer'
import AppTextArea from '../AppTextArea'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AppWrapper = styled.div`
  text-align: center;
  margin: 0px auto;
`

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <MenuAppBar />
        <AppTextArea />
        <VolumeMeter />
        <Footer />
        <ToastContainer />
      </AppWrapper>
    )
  }
}

export default App
