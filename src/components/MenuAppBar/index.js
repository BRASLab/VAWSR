import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Avatar from '@material-ui/core/Avatar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { login, logout } from '../../actions/LoginManager'
import RegisterSpeaker from './RegisterSpeaker'
import axios from 'axios'

axios.defaults.withCredentials = true

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'block'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
})

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null
  }

  constructor(props) {
    super(props)
    const { hostname, login } = this.props
    axios
      .get(`${hostname}/auth`)
      .then(res => res.data)
      .then(data => {
        login(data)
        console.log('Auth success')
      })
      .catch(() => {
        console.log('Auth failed')
      })
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
  }

  handleLogin = res => {
    const { hostname, login } = this.props
    axios
      .post(
        `${hostname}/login`,
        {
          email: res.email,
          name: res.name,
          token: res.accessToken,
          signed: res.signedRequest,
          fbid: Number(res.id)
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .then(res => res.data)
      .then(data => {
        login(data)
        toast.success('Login success', {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      })
      .catch(() =>
        toast.error('Login failed', {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      )
      .finally(() => {
        this.handleMenuClose()
      })
  }

  handleLogout = () => {
    const { logout, hostname } = this.props
    axios.get(`${hostname}/logout`)
    logout()
    toast.warn('Logout success', { position: toast.POSITION.BOTTOM_RIGHT })
    this.handleMenuClose()
  }

  render() {
    const { anchorEl } = this.state
    const { classes, logined, stream, user } = this.props
    const isMenuOpen = Boolean(anchorEl)

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}>
        {logined ? (
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        ) : (
          <FacebookLogin
            appId="332358063993706"
            fields="name,email,picture"
            disableMobileRedirect={true}
            callback={this.handleLogin}
            render={renderProps => (
              <MenuItem onClick={renderProps.onClick}>Facebook Login</MenuItem>
            )}
          />
        )}
        {logined && <RegisterSpeaker callback={this.handleMenuClose} />}
      </Menu>
    )

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap>
              具語者辨識之語音助理
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit">
                {user.fbid ? (
                  <Avatar
                    alt={user.name}
                    src={`https://graph.facebook.com/${
                      user.fbid
                    }/picture?type=normal`}
                  />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit">
                {user.fbid ? (
                  <Avatar
                    alt={user.name}
                    src={`https://graph.facebook.com/${
                      user.fbid
                    }/picture?type=normal`}
                  />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {stream && renderMenu}
      </div>
    )
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  logined: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  hostname: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  stream: PropTypes.object
}

const mapStateToProps = state => {
  return {
    logined: state.LoginManager.logined,
    hostname: state.Host.hostname,
    user: state.LoginManager,
    stream: state.Recorder.stream
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login,
      logout
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PrimarySearchAppBar))
