<template>

  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <!-- <div class="text-left">
          <h1 class="h2 mb-6">Buy {{ baseId }} with {{ quoteId }}</h1>
        </div> -->

        <card-select-pricing
          v-if="!isLoading"
          :market="market"
          :balance="balance"
          :ticker="ticker"
          :prices="prices"
          :context="'buy'">
        </card-select-pricing>

      </div>
      <div class="col-md-6 col-lg-8">
        <trading-view-chart :exchange="`BITTREX`" :quoteId="quoteId" :baseId="baseId"></trading-view-chart>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardSelectPricing from '@/components/card/SelectPricing'
import TradingViewChart from '@/components/TradingViewChart'

export default {
  name: 'PageBuySelectPricing',
  components: {
    TradingViewChart,
    CardSelectPricing
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
}
</script>
