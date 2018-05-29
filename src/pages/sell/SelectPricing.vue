<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="text-left">
          <h1 class="h2 mb-6">Sell {{ quoteId }} for {{ baseId }}</h1>
        </div>
        <select-pricing
          v-if="!isLoading"
          :market="market"
          :balance="balance"
          :ticker="ticker"
          :prices="prices"
          :side="'sell'">
        </select-pricing>
      </div>
      <div class="col-md-8">
        <TradingViewChart :exchange="`BITTREX`" :baseId="baseId" :quoteId="quoteId"></TradingViewChart>
      </div>
    </div>
  </div>

</template>

<script>
import CardSelectPricing from '@/components/card/SelectPricing'
import TradingViewChart from '@/components/TradingViewChart.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'PageSellSelectPricing',
  components: {
    CardSelectPricing,
    TradingViewChart
  },
  computed: {
    ...mapGetters({
      isLoadingBalances: 'balances/isLoading',
      isLoadingMarkets: 'markets/isLoading',
      isLoadingTickers: 'tickers/isLoading',
      getTickerBySymbol: 'tickers/getTickerBySymbol',
      getMarketBySymbol: 'markets/getMarketBySymbol',
      getBalanceBySymbol: 'balances/getBalanceBySymbol',
      prices: 'prices/prices'
    }),
    isLoading () {
      return this.isLoadingBalances || this.isLoadingMarkets || this.isLoadingTickers
    },
    balance () {
      return this.getBalanceBySymbol(this.quoteId)
    },
    marketSymbol () {
      return this.baseId + '/' + this.quoteId
    },
    market () {
      return this.getMarketBySymbol(this.marketSymbol)
    },
    baseId () {
      return this.$route.params.baseId
    },
    quoteId () {
      return this.$route.params.quoteId
    },
    ticker () {
      return this.getTickerBySymbol(this.marketSymbol)
    }
  }
  // beforeRouteEnter (to, from, next) {
  //   // Check to see if market exists
  //   const markets = store.state.markets.markets
  //   const marketSymbol = `${to.params.quoteId}/${to.params.baseId}`
  //   const hasMarket = markets[marketSymbol]
  //   if (hasMarket) {
  //     next()
  //   } else {
  //     router.push('/sell')
  //   }
  // }
}
</script>
