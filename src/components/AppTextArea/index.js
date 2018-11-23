import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Response from './Response'

const TextArea = styled.div`
  width: 100%;
  height: calc(100vh - 132px);
  overflow: scroll;
  overflow-x: hidden;
  border-radius: 10px;
  background: #eee;
`

class AppTextArea extends Component {
  componentDidMount() {
    this.scrollToBottom()
  }
  componentDidUpdate() {
    this.scrollToBottom()
  }
  scrollToBottom() {
    this.el.scrollTop = this.el.scrollTopMax + 1000
  }

  render() {
    const { google, kaldi, responses } = this.props
    let responseItem = []
    for (let i = 0; i < responses.length; i++) {
      responseItem.push(<Response key={i} {...responses[i]} />)
    }
    return (
      <TextArea
        innerRef={el => {
          this.el = el
        }}>
        {responseItem}
        <Response google={google} kaldi={kaldi} proba={0} text={''} url={''} />
      </TextArea>
    )
  }
}

AppTextArea.propTypes = {
  google: PropTypes.string.isRequired,
  kaldi: PropTypes.string.isRequired,
  responses: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    google: state.Websocket.google,
    kaldi: state.Websocket.kaldi,
    responses: state.Websocket.responses
  }
}

export default connect(mapStateToProps)(AppTextArea)
