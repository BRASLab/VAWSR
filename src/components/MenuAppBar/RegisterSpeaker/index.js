import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PlayArrow from '@material-ui/icons/PlayArrow'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { connect } from 'react-redux'
import axios from 'axios'

import Record from './Record'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float: 'right'
  },
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  }
})

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class RegisterDialog extends React.Component {
  state = {
    open: false,
    sentences: [],
    audioBlob: {},
    audio: [],
    step: 0
  }

  handleClickOpen = () => {
    this.generateSentences()
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
      var fd = new FormData()
      // eslint-disable-next-line
      for(let i = 0; i < 3; i++){
        fd.append(`file${i + 1}`, this.state.audioBlob[i], `file${i + 1}.wav`)
      }
      axios
        .post('http://140.125.45.147:8000/registerspeaker', fd)
        .then(res => res.data)
        .then(({ status }) => {
          if (status) this.handleClose()
        })
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
    axios
      .get('http://140.125.45.147:8000/sentences.json')
      .then(res => res.data)
      .then(({ sentences }) => {
        this.setState({ sentences: sentences })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <MenuItem onClick={this.handleClickOpen}> {this.props.user.hasivector ? '重新註冊語者' : '語者設定'}</MenuItem>
        <Dialog fullScreen open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                語者設定
              </Typography>
              <Button onClick={this.handleBack} color="inherit">
                Back
              </Button>
              <Button onClick={this.handleNext} color="inherit" autoFocus disabled={!this.state.audioBlob[this.state.step]}>
                {this.state.step === 2 ? 'Finish' : 'Next'}
              </Button>
            </Toolbar>
          </AppBar>
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
              onClick={this.replayBlob}>
              <PlayArrow />
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

RegisterDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  callback: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
const mapStateToProps = state => {
  return {
    user: state.LoginManager
  }
}

export default connect(mapStateToProps)(withStyles(styles)(RegisterDialog))
