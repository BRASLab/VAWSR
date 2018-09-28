import Cookies from 'universal-cookie'

const cookie = new Cookies()

const VolumeMeter = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_THRESHOLD':
      return Object.assign({}, state, { threshold: action.threshold })
    case 'UPDATE_VOLUME':
      return Object.assign({}, state, { volume: action.volume })
    default:
      return {
        threshold: cookie.get('threshold') || 50,
        volume: 0
      }
  }
}

export default VolumeMeter
