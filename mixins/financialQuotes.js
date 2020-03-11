const financialQuotes = {
  data() {
    return {
      themeCloud: []
    }
  },
  methods: {
    populateCryptoQuotes(symbol) {
      this.$store.dispatch('api/GET_CRYPTO_QUOTE', symbol).then(res => {
        const tooltips = document.querySelectorAll(
          '.crypto-ticker.' + symbol
        )
        for (let i = 0; i < tooltips.length; i++) {
          const changeValue = Math.round(res.data.changePercent24Hr * 100) / 100
          const changeLabel = `${changeValue}%`
          if (changeValue > 0) {
            tooltips[i].className += ' highlighted link green'
          } else {
            tooltips[i].className += ' highlighted link red'
          }
          tooltips[i].textContent = `[${res.data.symbol} ${changeLabel} ]`
        }
      })
    }
  }
}

export { financialQuotes }
