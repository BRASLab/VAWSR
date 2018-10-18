import React from 'react'
import Meter from './Meter'
import Cookies from 'universal-cookie'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { startRecord, updateStream } from '../../actions/Recorder'

class VolumeMeter extends React.Component {
  constructor(props) {
    super(props)
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    this.state = {
      audioContext: new AudioContext(),
      src: null,
      volume: 0,
      threshold: 50
    }
    this.cookie = new Cookies()
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      this.props.dispatch(updateStream(stream))
      this.setState(prevState => ({
        src: prevState.audioContext.createMediaStreamSource(stream)
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
    if (percentage >= this.state.threshold && !this.props.record) {
      this.props.dispatch(startRecord())
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
    let { volume, threshold } = this.state
    return (
      <div ref={node => (this.node = node)}>
        <Meter
          handleMouse={this.handleMouse}
          threshold={threshold}
          width={volume}
        />
      </div>
    )
  }
}

VolumeMeter.propTypes = {
  dispatch: PropTypes.func,
  record: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    record: state.Recorder.record
  }
}

export default connect(mapStateToProps)(VolumeMeter)
