import Cookie from 'js-cookie'

export default async function ({ isServer, store, res, app }) {
  const token = Cookie.get('t')

  if (typeof token === 'undefined') {
    const tokenRes = await app.$axios.get(
      `${process.env.API_ENDPOINT}/auth/get-token`
    )

    if (tokenRes) {
      if (isServer) {
        res.setHeader(tokenRes.data.data.type, tokenRes.data.data.token)
      }

      Cookie.set('t', tokenRes.data.data.token)
      store.commit('api/setAuth', {
        type: tokenRes.data.data.type,
        token: tokenRes.data.data.token
      })
    }
  } else {
    if (isServer) {
      res.setHeader('Authorization', token)
    }
    store.commit('api/setAuth', {
      type: 'Bearer',
      token: token
    })
  }
}
