import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Recorder extends React.Component {
  componentDidMount() {
    const { stream } = this.props
  }
  render() {
    return <div />
  }
}

Recorder.propTypes = {
  stream: PropTypes.object.isRequired,
  record: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    record: state.Recorder.record,
    stream: state.Recorder.stream
  }
}

export default connect(mapStateToProps)(Recorder)
