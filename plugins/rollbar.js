import Rollbar from 'rollbar'

const rollbar = new Rollbar({
  enabled: process.env.NODE_ENV === 'production',
  accessToken: process.env.ROLLBAR_CLIENT_KEY,
  serverAccessToken: process.env.ROLLBAR_SERVER_KEY,
  captureUncaught: true,
  captureUnhandledRejections: true
})

export default function (ctx, inject) {
  inject('rollbar', rollbar)
}
