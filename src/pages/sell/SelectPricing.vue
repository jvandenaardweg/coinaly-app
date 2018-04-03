<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <div class="text-left">
        <h1 class="h2 mb-6">Sell {{ quoteCurrency }} for {{ baseCurrency }}</h1>
      </div>
      <SelectPricing
        :activeMarket="activeMarket"
        :activeBalance="activeBalance"
        :quoteCurrency="quoteCurrency"
        :baseCurrency="baseCurrency"
        :marketSymbol="marketSymbol"
        :routeBase="'sell'">
      </SelectPricing>
    </div>
    <div class="col-md-7">
      <TradingViewChart :exchange="`BITTREX`" :baseCurrency="baseCurrency" :quoteCurrency="quoteCurrency"></TradingViewChart>
    </div>
  </div>
</template>

<script>
import SelectPricing from '@/components/SelectPricing'
import TradingViewChart from '@/components/TradingViewChart.vue'
import { mapGetters } from 'vuex'
import pickBy from 'lodash/pickBy'
// import store from '../../store'
// import router from '../../router'

export default {
  name: 'PageSellSelectPricing',
  components: {
    SelectPricing,
    TradingViewChart
  },
  data () {
    return {
      showSmartTradeInfo: false,
      quoteCurrency: this.$route.params.quoteCurrency,
      baseCurrency: this.$route.params.baseCurrency
    }
  },
  computed: {
    ...mapGetters({
      allCurrencies: 'balances/allCurrencies',
      allFilledCurrencies: 'balances/allFilledCurrencies',
      allCurrenciesTotal: 'balances/allCurrenciesTotal',
      allFilledCurrenciesTotal: 'balances/allFilledCurrenciesTotal',
      allMarkets: 'markets/allMarkets'
    }),
    activeMarket () {
      return pickBy(this.allMarkets, (values, marketSymbol) => {
        return marketSymbol === this.marketSymbol
      })
    },
    activeBalance () {
      return pickBy(this.allFilledCurrencies, (values, balanceSymbol) => {
        return balanceSymbol === this.quoteCurrency
      })
    },
    marketSymbol () {
      return `${this.quoteCurrency}/${this.baseCurrency}`
    },
    baseCurrencyUppercased () {
      return (this.baseCurrency) ? this.baseCurrency.toUpperCase() : null
    },
    baseCurrencyTitle () {
      return (this.baseCurrency) ? this.baseCurrencyUppercased : '...?'
    }
  }
  // beforeRouteEnter (to, from, next) {
  //   // Check to see if market exists
  //   const markets = store.state.markets.markets
  //   const marketSymbol = `${to.params.quoteCurrency}/${to.params.baseCurrency}`
  //   const hasMarket = markets[marketSymbol]
  //   if (hasMarket) {
  //     next()
  //   } else {
  //     router.push('/sell')
  //   }
  // }
}
</script>
