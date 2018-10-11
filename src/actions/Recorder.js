export const startRecord = () => {
  return {
    type: 'START_RECORD'
  }
}

export const stopRecord = () => {
  return {
    type: 'STOP_RECORD'
  }
}

export const updateStream = stream => {
  return {
    type: 'UPDATE_STREAM',
    stream
  }
}
