import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import socket from 'socket.io-client'
import { bindActionCreators } from 'redux'
import {
  on_connect,
  update_google,
  update_kaldi,
  stop_stream
} from '../../actions/Websocket'

class Websocket extends React.Component {
  state = {
    google: [],
    context: new AudioContext()
  }
  componentDidMount = () => {
    const { stream, on_connect } = this.props
    const { context } = this.state
    this.socket = socket('wss://vawsr.mino.tw/ws')
    on_connect()

    this.processor = context.createScriptProcessor(2048, 1, 1)
    this.processor.connect(context.destination)
    context.suspend()
    this.input = context.createMediaStreamSource(stream)
    this.input.connect(this.processor)

    this.processor.onaudioprocess = e => {
      const { record } = this.props
      if (!record) return
      this.microphoneProcess(e)
    }
    this.registerEvents()
  }

  componentDidUpdate = prevProps => {
    const { record } = this.props
    if (prevProps.record === record) return
    if (record) {
      this.startRecording()
    } else {
      this.stopRecording()
    }
  }

  registerEvents = () => {
    this.socket.on('google_speech_data', ({ transcript, is_final }) => {
      console.log(transcript)
      if (is_final) {
        this.setState(prevState => {
          return { google: [...prevState.google, transcript] }
        })
      }
      const { google } = this.state
      const { update_google } = this.props
      update_google(google.reduce((x, y) => x + ' ' + y, '') + transcript)
    })

    this.socket.on('kaldi_speech_data', ({ transcript }) => {
      const { update_kaldi } = this.props
      update_kaldi(transcript)
    })

    this.socket.on('stop_stream', ({ proba, result }) => {
      /**
       * Now testing
       */
      console.log(proba)
      const { stop_stream } = this.props
      this.setState({ google: [] })
      stop_stream(proba, result)
    })
  }

  startRecording = () => {
    const { context } = this.state
    this.socket.emit('start_stream', '')
    context.resume()
  }

  stopRecording = () => {
    const { context } = this.state
    context.suspend()
    this.socket.emit('stop_stream', '')
  }

  microphoneProcess = e => {
    var left = e.inputBuffer.getChannelData(0)
    var left16 = this.downsampleBuffer(left, 44100, 16000)
    this.socket.emit('binary_data', left16)
  }

  downsampleBuffer = (buffer, sampleRate, outSampleRate) => {
    if (outSampleRate === sampleRate) {
      return buffer
    }
    if (outSampleRate > sampleRate) {
      throw Error('downsampling rate show be smaller than original sample rate')
    }
    var sampleRateRatio = sampleRate / outSampleRate
    var newLength = Math.round(buffer.length / sampleRateRatio)
    var result = new Int16Array(newLength)
    var offsetResult = 0
    var offsetBuffer = 0
    while (offsetResult < result.length) {
      var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio)
      var accum = 0,
        count = 0
      for (
        var i = offsetBuffer;
        i < nextOffsetBuffer && i < buffer.length;
        i++
      ) {
        accum += buffer[i]
        count++
      }

      result[offsetResult] = Math.min(1, accum / count) * 0x7fff
      offsetResult++
      offsetBuffer = nextOffsetBuffer
    }
    return result.buffer
  }

  render() {
    return <div />
  }
}

Websocket.propTypes = {
  stream: PropTypes.object.isRequired,
  record: PropTypes.bool.isRequired,
  on_connect: PropTypes.func.isRequired,
  update_google: PropTypes.func.isRequired,
  update_kaldi: PropTypes.func.isRequired,
  stop_stream: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    record: state.Recorder.record,
    stream: state.Recorder.stream
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { on_connect, update_google, update_kaldi, stop_stream },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Websocket)
