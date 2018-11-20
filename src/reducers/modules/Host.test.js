import Host from './Host'

describe('Host reducer', () => {
  it('should retrun inital state', () => {
    const initialState = { hostname: 'https://vawsr.mino.tw' }
    expect(Host(undefined, {})).toEqual(initialState)
  })

  it('should handle CHANGE_HOST', () => {
    const action = {
      type: 'CHANGE_HOST',
      hostname: 'https://test'
    }
    expect(Host(undefined, action)).toEqual({
      hostname: 'https://test'
    })
  })
})
