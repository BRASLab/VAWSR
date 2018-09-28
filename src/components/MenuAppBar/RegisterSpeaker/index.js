import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PlayArrow from '@material-ui/icons/PlayArrow'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'

import Record from '../../Record'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float: 'right'
  }
})

class RegisterDialog extends React.Component {
  state = {
    open: false,
    sentences: [],
    audioBlob: {},
    audio: [],
    step: 0
  }
  componentDidMount = () => {
    this.generateSentences()
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.callback()
  }
  handleBack = () => {
    if (this.state.step > 0) {
      this.setState(prevState => ({ step: prevState.step - 1 }))
    } else {
      this.handleClose()
    }
  }

  handleNext = () => {
    if (this.state.step < 2) {
      this.setState(prevState => ({ step: prevState.step + 1 }))
    } else {
      this.handleClose()
    }
  }

  handleURL = blob => {
    let obj = {}
    obj[this.state.step] = blob
    this.setState(prevState => ({ audioBlob: Object.assign({}, prevState.audioBlob, obj) }))
  }

  replayBlob = () => {
    var blobURL = window.URL.createObjectURL(this.state.audioBlob[this.state.step])
    var audio0 = new Audio(blobURL)
    audio0.play()
  }

  generateSentences = () => {
    fetch('http://140.125.45.147:8000/sentences.json')
      .then(res => res.json())
      .then(({ sentences }) => {
        this.setState({ sentences: sentences })
      })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <MenuItem onClick={this.handleClickOpen}>語者設定</MenuItem>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="responsive-dialog-title">
          <DialogTitle id="responsive-dialog-title">{'請朗讀下列文字進行語者註冊'}</DialogTitle>
          <DialogContent>
            <DialogContentText>{this.state.sentences[this.state.step]}</DialogContentText>
            <Record handleURL={this.handleURL} />
            <Button
              disabled={!this.state.audioBlob[this.state.step]}
              className={classes.button}
              variant="fab"
              color="secondary"
              type="button"
              onClick={this.replayBlob}
            >
              <PlayArrow />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleBack} color="primary">
              Back
            </Button>
            <Button onClick={this.handleNext} color="primary" autoFocus>
              {this.state.step === 2 ? 'Finish' : 'Next'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

RegisterDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  callback: PropTypes.func.isRequired
}

export default withStyles(styles)(RegisterDialog)
