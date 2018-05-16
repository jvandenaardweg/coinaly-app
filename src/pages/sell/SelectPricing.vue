<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="text-left">
          <h1 class="h2 mb-6">Sell {{ quoteId }} for {{ baseId }}</h1>
        </div>
        <select-pricing
          :activeMarket="activeMarket"
          :activeBalance="activeBalance"
          :quoteId="quoteId"
          :baseId="baseId"
          :marketSymbol="marketSymbol"
          :routeBase="'sell'">
        </select-pricing>
      </div>
      <div class="col-md-7">
        <TradingViewChart :exchange="`BITTREX`" :baseId="baseId" :quoteId="quoteId"></TradingViewChart>
      </div>
    </div>
  </div>

</template>

<script>
import CardSelectPricing from '@/components/card/SelectPricing'
import TradingViewChart from '@/components/TradingViewChart.vue'
import { mapGetters } from 'vuex'
import pickBy from 'lodash/pickBy'

export default {
  name: 'PageSellSelectPricing',
  components: {
    CardSelectPricing,
    TradingViewChart
  },
  data () {
    return {
      showSmartTradeInfo: false,
      quoteId: this.$route.params.quoteId,
      baseId: this.$route.params.baseId
    }
  },
  computed: {
    ...mapGetters({
      allCurrencies: 'balances/allCurrencies',
      allFilledBalances: 'balances/allFilledBalances',
      allCurrenciesTotal: 'balances/allCurrenciesTotal',
      allFilledBalancesTotal: 'balances/allFilledBalancesTotal',
      allMarkets: 'markets/allMarkets'
    }),
    activeMarket () {
      return pickBy(this.allMarkets, (values, marketSymbol) => {
        return marketSymbol === this.marketSymbol
      })
    },
    activeBalance () {
      return pickBy(this.allFilledBalances, (values, balanceSymbol) => {
        return balanceSymbol === this.quoteId
      })
    },
    marketSymbol () {
      return `${this.quoteId}/${this.baseId}`
    },
    baseIdUppercased () {
      return (this.baseId) ? this.baseId.toUpperCase() : null
    },
    baseIdTitle () {
      return (this.baseId) ? this.baseIdUppercased : '...?'
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
