const financialQuotes = {
  data() {
    return {
      themeCloud: []
    }
  },
  methods: {
    populateCryptoQuotes(symbol) {
      this.$store.dispatch('api/GET_CRYPTO_QUOTE', symbol).then(res => {
        // console.log(res.cap24hrChange)
        // console.log(res.id)
        const tooltips = document.getElementsByClassName(
          'crypto-ticker ' + symbol
        )
        for (let i = 0; i < tooltips.length; i++) {
          let changeValue = res.cap24hrChange

          if (res.cap24hrChange > 0) {
            tooltips[i].className += ' highlighted link green'
            changeValue = `+${changeValue}%`
          } else {
            tooltips[i].className += ' highlighted link red'
            changeValue = `-${changeValue}%`
          }
          tooltips[i].textContent = `[${res.id} ${changeValue} ]`
        }
      })
    }
  }
}

export { financialQuotes }
