<template>
  <div class="list-group list-group-flush">
    <list-group-item-symbol-select
      v-for="(quoteSymbol, baseSymbol, index) in markets"
      :key="baseSymbol"
      :symbol="baseSymbol"
      :meta="meta(baseSymbol, quoteSymbol)"
      :currency="currency(baseSymbol)"
      >
    </list-group-item-symbol-select>
  </div>
</template>

<script>
import ListGroupItemSymbolSelect from '@/components/list-group-item/SymbolSelect'

export default {
  name: 'ListGroupMarkets',
  components: {
    ListGroupItemSymbolSelect
  },
  props: {
    markets: {
      type: Object,
      required: true
    },
    currencies: {
      type: Object,
      required: true
    },
    balances: {
      type: Object,
      required: true
    },
    prices: {
      type: Object,
      required: true
    },
    tickers: {
      type: Object,
      required: true
    }
  },
  methods: {
    fallbackSymbol (symbol) {
      return {
        'icon_uri': '/static/icons/cryptocurrencies/svg/black/generic.svg',
        'name': symbol,
        'id': symbol
      }
    },
    currency (symbol) {
      return this.currencies[symbol] || this.fallbackSymbol(symbol)
    },
    balance (symbol) {
      return this.balances[symbol] || { free: 0 }
    },
    ticker (baseSymbol, quoteSymbol) {
      return this.tickers[`${baseSymbol}/${quoteSymbol}`]
    },
    tickerLast (baseSymbol, quoteSymbol) {
      if (this.ticker(baseSymbol, quoteSymbol)) return this.ticker(baseSymbol, quoteSymbol).last
      return 0
    },
    meta (baseSymbol, quoteSymbol) {
      const price = (this.tickerLast(baseSymbol, quoteSymbol) * this.prices[quoteSymbol].USD)

      return this.$options.filters.currency(price)
    }
  }
}
</script>

<style lang="scss">
//
</style>
