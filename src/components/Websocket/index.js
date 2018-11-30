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
import { tify } from 'chinese-conv'

class Websocket extends React.Component {
  state = {
    context: new AudioContext()
  }
  componentDidMount = () => {
    const { stream, on_connect } = this.props
    const { context } = this.state
    this.socket = socket('wss://vawsr.mino.tw/ws')
    on_connect()
    this.processor = context.createScriptProcessor(8192, 1, 1)
    this.sampleRate = context.sampleRate
    this.processor.connect(context.destination)
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
    if (!record) {
      this.stopRecording()
    }
  }

  registerEvents = () => {
    this.socket.on('google_speech_data', ({ transcript }) => {
      const { update_google } = this.props
      update_google(transcript)
    })

    this.socket.on('kaldi_speech_data', ({ transcript }) => {
      const { update_kaldi } = this.props
      update_kaldi(tify(transcript.replace(/ /g, '')))
    })

    this.socket.on('stop_stream', ({ google, kaldi, proba, result }) => {
      const { stop_stream } = this.props
      stop_stream(google, tify(kaldi.replace(/ /g, '')), proba, result)
    })
  }

  stopRecording = () => {
    this.socket.emit('stop_stream', '')
  }

  microphoneProcess = e => {
    var left = e.inputBuffer.getChannelData(0)
    var left16
    if (this.sampleRate > 44100) {
      left16 = this.downsampleBuffer(left, this.sampleRate, 44100)
    } else {
      left16 = this.convertoFloat32ToInt16(left)
    }
    this.socket.emit('binary_data', left16)
  }

  convertoFloat32ToInt16 = buffer => {
    var l = buffer.length
    var buf = new Int16Array(l)

    while (l--) {
      buf[l] = buffer[l] * 0x7fff //convert to 16 bit
    }
    return buf.buffer
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
