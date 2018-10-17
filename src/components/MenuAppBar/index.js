import React from 'react'
import PropTypes from 'prop-types'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Input from '@material-ui/core/Input'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { connect } from 'react-redux'
import axios from 'axios'

import { login, logout } from '../../actions'
import RegisterSpeaker from './RegisterSpeaker'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

axios.defaults.withCredentials = true

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto'
    }
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
})

class MenuAppBar extends React.Component {
  state = {
    anchorEl: null,
    showSetting: null,
    login: this.props.login,
    user: this.props.user
  }
  constructor(props) {
    super(props)
    axios
      .get('http://140.125.45.147:8000/auth')
      .then(res => res.data)
      .then(data => {
        this.props.dispatch(login(data))
        console.log('Login success')
      })
      .catch(() => console.log('Not login'))
  }
  handleChange = event => {
    this.setState({ auth: event.target.checked })
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }
  handleLogout = () => {
    this.handleClose()
    axios.get('http://140.125.45.147:8000/logout')
    this.props.dispatch(logout())
  }
  handleLogin = res => {
    this.handleClose()
    axios
      .post(
        'http://140.125.45.147:8000/login',
        { email: res.email, name: res.name, token: res.accessToken, signed: res.signedRequest, fbid: Number(res.id) },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .then(res => res.data)
      .then(data => {
        this.props.dispatch(login(data))
        console.log('Login success')
      })
      .catch(err => console.log(err))
  }

  render() {
    const { classes } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.grow}>
              具語者辨識之語音助理
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Input
                placeholder="Search…"
                disableUnderline
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            {this.props.stream && (
              <div>
                <IconButton aria-owns={open ? 'menu-appbar' : null} aria-haspopup="true" onClick={this.handleMenu} color="inherit">
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={this.handleClose}>
                  {!this.props.login && (
                    <FacebookLogin
                      appId="332358063993706"
                      fields="name,email,picture"
                      callback={this.handleLogin}
                      render={renderProps => <MenuItem onClick={renderProps.onClick}>Facebook Login</MenuItem>}
                    />
                  )}
                  {this.props.login && <MenuItem onClick={this.handleLogout}>Logout</MenuItem>}
                  {this.props.login && <RegisterSpeaker callback={this.handleClose} />}
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  stream: PropTypes.object
}

const mapStateToProps = state => {
  return {
    login: state.LoginManager.login,
    user: state.LoginManager,
    stream: state.Recorder.stream
  }
}

export default connect(mapStateToProps)(withStyles(styles)(MenuAppBar))
