<template>
  <div class="list-group list-group-flush">
    <router-link
      :to="`balances/${symbol}`"
      v-for="(meta, symbol, index) in balances"
      :key="symbol"
      :index="index"
      class="list-group-item list-group-item-action">

      <list-group-item-balance
        :currency="currencies[symbol]"
        :balance="meta"
        :symbol="symbol"
        :price="prices[tickerQuote(symbol)]"
        :percentage="percentage(symbol)"
        :tickerLast="tickerLast(symbol)">
      </list-group-item-balance>

    </router-link>

  </div>
</template>

<script>
import ListGroupItemBalance from '@/components/list-group-item/Balance'

export default {
  name: 'ListGroupBalances',
  components: {
    ListGroupItemBalance
  },
  props: {
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
    tickerQuote (symbol) {
      // TODO: USDT will not return a base market, needs to be fixed
      const baseMarket = this.$store.getters['markets/availableBaseMarkets'][symbol]
      if (baseMarket) return baseMarket[0]
      return null
    },
    balanceTicker (symbol) {
      return this.tickers[`${symbol}/${this.tickerQuote(symbol)}`]
    },
    tickerLast (symbol) {
      if (this.balanceTicker(symbol)) return this.balanceTicker(symbol).last
      return 0
    },
    percentage (symbol) {
      if (this.balanceTicker(symbol) && this.balanceTicker(symbol).percentage) {
        return this.balanceTicker(symbol).percentage
      } else if (this.balanceTicker(symbol)) {
        return (this.balanceTicker(symbol).last - this.balanceTicker(symbol).open) * 100
      } else {
        return 0
      }
    }
  }
}
</script>

<style lang="scss">
//
</style>
