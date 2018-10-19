export const promiseDelay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
