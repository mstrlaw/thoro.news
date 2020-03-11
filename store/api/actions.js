/* eslint-disable no-empty-pattern, no-return-await */

const serialize = options => {
  let str = ''
  for (const k in options) {
    if (str !== '') {
      str += '&'
    }
    str += k + '=' + encodeURIComponent(options[k])
  }
  return str
}

export default {
  // Articles
  async GET_ARTICLE({ getters }, { articleId, options }) {
    let url = `${process.env.API_ENDPOINT}/api/article/${articleId}`
    if (options) {
      url += '?' + serialize(options)
    }
    return await this.$axios.get(url, {
      headers: { Authorization: `${getters.auth.type} ${getters.auth.token}` }
    })
  },
  // Topics
  async GET_TOPICS({ getters }, data) {
    const d = data.date
    const t = data.topic === 'world' ? 'all' : data.topic
    const s = typeof data.subtopic === 'undefined' ? 'all' : data.subtopic
    const o = JSON.stringify(data.options)

    return await this.$axios.get(
      `${process.env.API_ENDPOINT}/api/topics/${d}/${t}/${s}/${o}`,
      {
        headers: { Authorization: `${getters.auth.type} ${getters.auth.token}` }
      }
    )
  },
  async GET_TOPIC_DATA({ getters }, data) {
    const topic = data.topic
    // let t = (data.topic === 'world' ? 'all' : data.topic)
    const o = JSON.stringify(data.options)
    return await this.$axios.get(
      `${process.env.API_ENDPOINT}/api/stats/frequency/${topic}/${o}`,
      {
        headers: { Authorization: `${getters.auth.type} ${getters.auth.token}` }
      }
    )
  },
  // Crypto
  async GET_CRYPTO_QUOTE({}, symbol) {
    const url = `https://api.coincap.io/v2/assets/${symbol}`
    return await this.$axios.$get(url)
  },
  // Twitter
  async GET_TWEETS({ getters }, queryParam) {
    const url = `${process.env.API_ENDPOINT}/api/tweets/${queryParam}`
    return await this.$axios.get(url, {
      headers: { Authorization: `${getters.auth.type} ${getters.auth.token}` }
    })
  },
  // Search
  async searchArticle({ getters }, { query, options }) {
    let url = `${process.env.API_ENDPOINT}/api/search/${query}`
    if (options) {
      url += '?' + serialize(options)
    }
    return await this.$axios.$get(url, {
      headers: { Authorization: `${getters.auth.type} ${getters.auth.token}` }
    })
  }
}
