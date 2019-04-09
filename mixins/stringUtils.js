const stringUtils = {
  methods: {
    /*
    s - string
    n - size to keep
    r - trunc starting from end
    */
    truncString(s, n, r) {
      if (s === null || typeof s === 'undefined') {
        return
      }

      if (r) {
        return s.length - n >= n
          ? '...' + s.substr(s.length - n - 1, s.length)
          : s
      } else {
        return s.length > n ? s.substr(0, n - 1) + '...' : s
      }
    }
  }
}

export { stringUtils }
