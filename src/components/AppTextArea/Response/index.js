import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  flex: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  flexRight: {
    display: 'flex'
  },
  clear: {
    clear: 'both'
  },
  margin: {
    margin: theme.spacing.unit,
    width: '80%'
  },
  marginLeft: {
    'margin-left': 'auto'
  },
  k_margin: {
    'margin-left': '3px',
    'margin-right': '3px'
  }
})

function Response(props) {
  const { classes, google, kaldi, proba, result } = props
  return (
    <div>
      {google && (
        <div className={classes.flex}>
          <TextField
            className={classes.margin}
            label="Google"
            defaultValue={google}
            variant="outlined"
            multiline
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={['fab', 'google']} />
                </InputAdornment>
              ),
              readOnly: true
            }}
          />
        </div>
      )}
      {kaldi && (
        <div className={classes.flex}>
          <TextField
            className={classes.margin}
            label="Kaldi"
            defaultValue={kaldi}
            multiline
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon
                    className={classes.k_margin}
                    icon={['fab', 'kaggle']}
                  />
                </InputAdornment>
              ),
              readOnly: true
            }}
          />
        </div>
      )}
      {result && (
        <div className={classes.flexRight}>
          <TextField
            className={classNames(classes.margin, classes.marginLeft)}
            label={`The probability: ${proba}`}
            defaultValue={result}
            multiline
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={['fas', 'robot']} />
                </InputAdornment>
              ),
              readOnly: true
            }}
          />
        </div>
      )}
      {result && <Divider className={classes.clear} />}
    </div>
  )
}

Response.propTypes = {
  classes: PropTypes.object.isRequired,
  google: PropTypes.string.isRequired,
  kaldi: PropTypes.string.isRequired,
  proba: PropTypes.number,
  result: PropTypes.string
}

export default withStyles(styles)(Response)
