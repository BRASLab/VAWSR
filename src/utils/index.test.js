import { promiseDelay, range } from './index'

describe('promiseDelay', () => {
  let spy
  beforeEach(() => {
    jest.useFakeTimers()
    spy = jest.fn()
    promiseDelay(100).then(spy) // after 100ms queue spy in PromiseJobs
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('should not resolve if < 100ms', async () => {
    jest.runTimersToTime(50)
    await Promise.resolve() // let any pending callbacks in PromiseJobs run
    expect(spy).not.toHaveBeenCalled() // SUCCESS
  })

  test('should resolve if >= 100ms', async () => {
    jest.runTimersToTime(100)
    await Promise.resolve() // let any pending callbacks in PromiseJobs run
    expect(spy).toHaveBeenCalled() // SUCCESS
  })
})

describe('range', () => {
  test('should equal to [0, 1, 2]', () => {
    expect(range(3)).toEqual([0, 1, 2])
  })
  test("should equal to ['0', '1', '2']", () => {
    expect(range(3, true)).toEqual(['0', '1', '2'])
  })
})
