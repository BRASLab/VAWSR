import React from 'react'
import Meter from './Meter'
import Cookies from 'universal-cookie'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Websocket from '../Websocket'
import { startRecord, stopRecord, updateStream } from '../../actions/Recorder'

class VolumeMeter extends React.Component {
  constructor(props) {
    super(props)
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    this.state = {
      audioContext: new AudioContext(),
      src: null,
      volume: 0,
      threshold: 50,
      stream: false,
      stopTimeout: 0
    }
    this.cookie = new Cookies()
  }

  componentDidMount() {
    const { updateStream } = this.props
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      updateStream(stream)
      this.setState(prevState => ({
        src: prevState.audioContext.createMediaStreamSource(stream),
        stream: stream
      }))
      this.setupAnalyser()
    })
    let threshold = this.cookie.get('threshold')
    if (threshold !== undefined && Number(threshold)) {
      this.setState({ threshold: Number(threshold) })
    }
  }

  setupAnalyser() {
    const { audioContext, src } = this.state
    this.analyser = audioContext.createAnalyser()
    src.connect(this.analyser)
    this.array = new Uint8Array(this.analyser.frequencyBinCount)
    setInterval(this.loop, 1000 / 10)
  }

  loop = () => {
    this.analyser.getByteTimeDomainData(this.array)
    var total = 0,
      i = 0,
      percentage,
      float,
      rms,
      db
    while (i < this.array.length) {
      float = this.array[i++] / 0x80 - 1
      total += float * float
    }
    rms = Math.sqrt(total / this.array.length)
    db = 20 * Math.log10(rms)
    db = Math.max(-48, Math.min(db, 0))
    percentage = 100 + db * 2.083
    this.setState({
      volume: Number(percentage.toFixed(2))
    })
    const { startRecord, stopRecord, record, logined, suspended } = this.props
    const { stream, threshold, stopTimeout } = this.state
    if (suspended && record) {
      stopRecord()
      return
    }
    if (suspended) return
    if (logined && stream && percentage >= threshold && !record) {
      startRecord()
    }
    if (record && percentage < threshold) {
      if (stopTimeout > 10) {
        this.setState({ stopTimeout: 0 })
        stopRecord()
      } else {
        this.setState(prevState => ({ stopTimeout: prevState.stopTimeout + 1 }))
      }
    }
  }

  handleMouse = () => {
    document.addEventListener('mousemove', this.handleMouseMove, true)
    document.addEventListener('mouseup', this.handleMouseUp, true)
  }
  handleMouseMove = event => {
    let threshold
    if (event.clientX < this.node.offsetLeft) {
      threshold = 0
    } else if (event.clientX > this.node.offsetWidth + this.node.offsetLeft) {
      threshold = (this.node.offsetWidth / this.node.clientWidth) * 100
    } else {
      threshold =
        ((event.clientX - this.node.offsetLeft) / this.node.clientWidth) * 100
    }

    this.setState({
      threshold: threshold
    })
  }
  handleMouseUp = event => {
    document.removeEventListener('mousemove', this.handleMouseMove, true)
    document.removeEventListener('mouseup', this.handleMouseUp, true)
    let threshold
    if (event.clientX < this.node.offsetLeft) {
      threshold = 0
    } else if (event.clientX > this.node.offsetWidth + this.node.offsetLeft) {
      threshold = (this.node.offsetWidth / this.node.clientWidth) * 100
    } else {
      threshold =
        ((event.clientX - this.node.offsetLeft) / this.node.clientWidth) * 100
    }

    this.setState({
      threshold: threshold
    })
    this.cookie.set('threshold', threshold)
  }

  render() {
    let { volume, threshold, stream } = this.state
    let { logined } = this.props
    return (
      <div ref={node => (this.node = node)}>
        <Meter
          handleMouse={this.handleMouse}
          threshold={threshold}
          width={volume}
        />
        {logined && stream && <Websocket />}
      </div>
    )
  }
}

VolumeMeter.propTypes = {
  startRecord: PropTypes.func.isRequired,
  stopRecord: PropTypes.func.isRequired,
  updateStream: PropTypes.func.isRequired,
  record: PropTypes.bool.isRequired,
  logined: PropTypes.bool.isRequired,
  suspended: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    record: state.Recorder.record,
    suspended: state.Recorder.suspended,
    logined: state.LoginManager.logined
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      startRecord,
      stopRecord,
      updateStream
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VolumeMeter)
