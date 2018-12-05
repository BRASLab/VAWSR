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
  constructor(props) {
    super(props)
    const { responses } = this.props
    this.responses = [...responses]
    this.responsesItem = responses.map((res, i) => (
      <Response key={i} {...res} />
    ))
  }

  scrollToBottom() {
    this.el.scrollTop = this.el.scrollTopMax + 100
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  render() {
    const { google, kaldi, responses } = this.props
    let responsesItem = this.responsesItem
    if (responses.length > this.responses.length) {
      for (let i = this.responses.length; i < responses.length; i++) {
        responsesItem.push(<Response key={i} {...responses[i]} />)
      }
      this.responses = [...responses]
    } else if (responses < this.responses) {
      this.responses = []
      this.responsesItem = []
      responsesItem = []
    }

    return (
      <TextArea
        innerRef={el => {
          this.el = el
        }}>
        {responsesItem}
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
