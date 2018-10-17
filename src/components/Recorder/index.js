import { connect } from 'react-redux'
import MediaStreamRecorder from 'msr'
import PropTypes from 'prop-types'
import React from 'react'
import { SpeakerRecognition } from '../../actions/ASR'

import axios from 'axios'
import { stopRecord } from '../../actions/Recorder'

class Recorder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      record: false
    }
  }

  componentDidMount = () => {
    const { stream } = this.props
    this.recorder = new MediaStreamRecorder(stream)
    this.recorder.mimeType = 'audio/wav'
    this.recorder.audioChannels = 1
    this.recorder.ondataavailable = blob => {
      this.handleBlob(blob)
    }
    this.setState({ ready: true })
  }

  shouldComponentUpdate = nextProps => {
    if (nextProps.record && !this.state.record) {
      this.recorder.start(3000)
      this.setState({ record: true })
    }
  }

  handleBlob = blob => {
    var fd = new FormData()
    fd.append('file', blob, 'file.wav')
    axios
      .post('http://140.125.45.147:8000/sr', fd)
      .then(res => res.data)
      .then(({ status, expired }) => {
        if (status) {
          this.handleStop()
          this.dispatch(SpeakerRecognition(expired))
        }
      })
      .catch(() => this.handleStop())
  }
  handleStop = () => {
    this.setState({ record: false })
    this.props.dispatch(stopRecord())
  }
  render() {
    return <div />
  }
}

Recorder.propTypes = {
  stream: PropTypes.object.isRequired,
  record: PropTypes.bool.isRequired,
  dispatch: PropTypes.func
}

const mapStateToProps = state => {
  return {
    record: state.Recorder.record,
    stream: state.Recorder.stream
  }
}

export default connect(mapStateToProps)(Recorder)
