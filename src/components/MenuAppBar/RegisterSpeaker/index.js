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
import green from '@material-ui/core/colors/green'
import CircularProgress from '@material-ui/core/CircularProgress'
import Slide from '@material-ui/core/Slide'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'

import Record from './Record'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float: 'right'
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
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

export class RegisterSpeaker extends React.Component {
  state = {
    open: false,
    sentences: [],
    audioBlob: {},
    audio: [],
    step: 0,
    loading: false
  }

  handleClick = () => {
    this.generateSentences()
    this.setState({ open: true })
  }

  handleClose = () => {
    const { callback } = this.props
    this.setState({ open: false })
    callback()
  }

  handleBack = () => {
    if (this.state.step > 0) {
      this.setState(prevState => ({ step: prevState.step - 1 }))
    } else {
      this.handleClose()
    }
  }

  handleNext = () => {
    if (this.state.step < 9) {
      this.setState(prevState => ({ step: prevState.step + 1 }))
    } else {
      const { hostname } = this.props
      this.setState({ loading: true })
      var fd = new FormData()
      // eslint-disable-next-line
      for(let i = 0; i < 10; i++){
        fd.append(`file${i + 1}`, this.state.audioBlob[i], `file${i + 1}.wav`)
      }
      axios
        .post(`${hostname}/registerspeaker`, fd, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          toast.success('語者註冊成功')
          this.handleClose()
        })
        .catch(() => {
          toast.error('語者註冊失敗，請重新傳送一遍')
          this.setState({ loading: false })
        })
    }
  }

  handleURL = blob => {
    let obj = {}
    obj[this.state.step] = blob

    this.setState(prevState => ({
      audioBlob: Object.assign({}, prevState.audioBlob, obj)
    }))
  }

  replayBlob = () => {
    var blobURL = window.URL.createObjectURL(
      this.state.audioBlob[this.state.step]
    )
    var audio0 = new Audio(blobURL)
    audio0.play()
  }

  generateSentences = () => {
    const { hostname } = this.props
    axios
      .get(`${hostname}/sentences.json`)
      .then(res => res.data)
      .then(({ sentences }) => {
        this.setState({ sentences: sentences })
      })
      .catch(() => {
        toast.error('取得語料失敗，請檢查登入是否過期')
        this.handleClose()
      })
  }

  render() {
    const { classes, hasivector } = this.props
    const { loading, step, sentences, audioBlob, open } = this.state
    return (
      <div>
        <MenuItem onClick={this.handleClick}>
          <p>{hasivector ? '重新註冊語者' : '語者設定'}</p>
        </MenuItem>
        <Dialog
          fullScreen
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                語者設定
              </Typography>
              <Button onClick={this.handleBack} color="inherit">
                Back
              </Button>
              <Button
                onClick={this.handleNext}
                color="inherit"
                autoFocus
                disabled={!audioBlob[step] || loading}>
                {step === 9 ? 'Finish' : 'Next'}
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </Button>
            </Toolbar>
          </AppBar>
          <DialogTitle id="responsive-dialog-title">
            {'請朗讀下列文字進行語者註冊'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="sentences">
              {sentences[step]}
            </DialogContentText>
            <Record handleURL={this.handleURL} />
            <Button
              disabled={!audioBlob[step]}
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

RegisterSpeaker.propTypes = {
  classes: PropTypes.object.isRequired,
  callback: PropTypes.func.isRequired,
  hasivector: PropTypes.bool.isRequired,
  hostname: PropTypes.string.isRequired
}
const mapStateToProps = state => {
  return {
    hasivector: state.LoginManager.hasivector,
    hostname: state.Host.hostname
  }
}

export default connect(mapStateToProps)(withStyles(styles)(RegisterSpeaker))
