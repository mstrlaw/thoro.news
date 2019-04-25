import Cookies from 'js-cookie'

const getToken = cookies => {
  let cookie = cookies.match(/\s?t={(.*?)(;|\n|\r|})/gmi)
  if (cookie > 0) {
    cookie = unescape(cookie[0].match(/{(.*)}/gmi))
    return JSON.parse(cookie)
  } else {
    return false
  }
}

const refreshToken = async (app, store, res) => {
  const tokenRes = await app.$axios.get(
    `${process.env.API_ENDPOINT}/auth/get-token`
  )

  if (tokenRes) {
    if (process.server) {
      res.setHeader('Authorization', `${tokenRes.data.data.type} ${tokenRes.data.data.token}`)
    }

    Cookies.remove('t')

    Cookies.set('t', tokenRes.data.data)

    store.commit('api/setAuth', {
      type: tokenRes.data.data.type,
      token: tokenRes.data.data.token
    })
  }
  return res
}

export default async function ({ store, req, res, app }) {
  let tokenData
  if (process.server) {
    tokenData = getToken(req.headers.cookie)
  } else {
    tokenData = Cookies.get('t')
  }

  //  Generate new token
  if (typeof tokenData === 'undefined' || !tokenData) {
    res = await refreshToken(app, store, res)
  } else {
    //  Use existing token
    //  TODO: check if token has expired to request new one

    if (process.server) {
      res.setHeader('Authorization', `Bearer ${tokenData.token}`)
    } else {
      tokenData = JSON.parse(tokenData)
    }

    store.commit('api/setAuth', {
      type: 'Bearer',
      token: tokenData.token
    })
  }
}
