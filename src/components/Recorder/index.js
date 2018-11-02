import { connect } from 'react-redux'
import MediaStreamRecorder from 'msr'
import PropTypes from 'prop-types'
import React from 'react'
import { SpeakerRecognition, stopRecord } from '../../actions'
import { bindActionCreators } from 'redux'
import axios from 'axios'

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
      this.recorder.stop()
      this.handleBlob(blob)
    }
    this.setState({ ready: true })
  }
  componentDidUpdate = prevProps => {
    const { record } = this.props
    if (prevProps.record === record) {
      return
    }
    if (record && !this.state.record) {
      this.setState({ record: true })
      this.recorder.start(4000)
    }
  }

  handleBlob = blob => {
    var fd = new FormData()
    fd.append('file', blob, 'file.wav')
    axios
      .post('https://vawsr.mino.tw/sr', fd)
      .then(res => res.data)
      .then(({ expired }) => {
        this.props.SpeakerRecognition(expired)
      })
      .catch(() => console.log('recognition failed'))
      .finally(() => this.handleStop())
  }
  handleStop = () => {
    this.recorder.stop()
    this.setState({ record: false })
    this.props.stopRecord()
  }
  render() {
    return <div />
  }
}

Recorder.propTypes = {
  stream: PropTypes.object.isRequired,
  record: PropTypes.bool.isRequired,
  SpeakerRecognition: PropTypes.func,
  stopRecord: PropTypes.func
}

const mapStateToProps = state => {
  return {
    record: state.Recorder.record,
    stream: state.Recorder.stream
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      SpeakerRecognition,
      stopRecord
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recorder)
