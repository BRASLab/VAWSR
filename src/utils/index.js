export const promiseDelay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const range = (length, str = false) => {
  /**
   * length: int
   * str: boolean
   *
   * Usage:
   *  range(3) == [0, 1, 2]
   *  range(3, true) == ['0', '1', '2']
   */
  if (str) {
    return Array.from({ length }, (_, i) => String(i))
  } else {
    return Array.from({ length }, (_, i) => i)
  }
}
