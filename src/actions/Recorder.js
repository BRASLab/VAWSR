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

export const resume = () => {
  return {
    type: 'RESUME_VOLUMEMETER'
  }
}

export const suspend = () => {
  return {
    type: 'SUSPEND_VOLUMEMETER'
  }
}
