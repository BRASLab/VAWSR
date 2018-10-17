import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Mic from '@material-ui/icons/Mic'
import Stop from '@material-ui/icons/Stop'
import MediaStreamRecorder from 'msr'
import { connect } from 'react-redux'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float: 'right'
  },
  record: {
    margin: '10px 0px'
  }
})

class Record extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      record: false,
      ready: false
    }
  }

  componentDidMount = () => {
    const { stream } = this.props
    this.recorder = new MediaStreamRecorder(stream)
    this.recorder.mimeType = 'audio/wav'
    this.recorder.audioChannels = 1
    this.recorder.ondataavailable = blob => {
      this.props.handleURL(blob)
    }
    this.setState({ ready: true })
  }
  startRecording = () => {
    this.setState({
      record: true
    })
    this.recorder.start(100000)
  }

  stopRecording = () => {
    this.setState({
      record: false
    })
    this.recorder.stop()
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.record}>
        <Button
          className={classes.button}
          variant="fab"
          color="secondary"
          onClick={this.state.record ? this.stopRecording : this.startRecording}
          type="button"
          disabled={!this.state.ready}>
          {this.state.record ? <Stop /> : <Mic />}
        </Button>
      </div>
    )
  }
}

Record.propTypes = {
  classes: PropTypes.object.isRequired,
  handleURL: PropTypes.func.isRequired,
  stream: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    stream: state.Recorder.stream
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Record))
