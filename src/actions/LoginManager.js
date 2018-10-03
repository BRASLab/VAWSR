export const login = user => {
  return {
    type: 'LOGIN',
    id: user.id,
    email: user.email,
    name: user.name,
    url: user.picture.data.url,
    token: user.accessToken
  }
}
