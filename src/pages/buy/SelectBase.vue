<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-10 col-md-10 col-lg-6 col-xl-6">
        <div class="text-center d-none d-sm-block">
          <h1 class="h2 mb-4">What are you buying?</h1>
          <p class="text-muted">The currencies below are listed on your selected exchange.</p>
        </div>
        <card-base-markets></card-base-markets>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SelectMarketQuote from '@/components/SelectMarketQuote'
import CardBaseMarkets from '@/components/card/BaseMarkets'

export default {
  name: 'PageBuySelectBase',
  components: {
    SelectMarketQuote,
    CardBaseMarkets
  },
  data () {
    return {
      previousQuoteCurrency: (this.$store.state.route.from) ? this.$store.state.route.from.params.quoteCurrency : null,
      subNavItems: [
        { label: 'All', uri: '', slug: 'all' },
        { label: 'Available', uri: 'available', slug: 'available' },
        { label: 'Unavailable', uri: 'unavailable', slug: 'unavailable' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      allCurrencies: 'balances/allCurrencies',
      allFilledBalances: 'balances/allFilledBalances',
      allBaseMarkets: 'markets/allBaseMarkets',
      allMarkets: 'markets/allMarkets',
      isLoadingMarkets: 'markets/isLoading'
    })
  },
  methods: {
    isAvailable (marketSymbol) {
      return Object.keys(this.allFilledBalances).includes(marketSymbol.split('/')[1])
    },
    iconName (marketSymbol) {
      return marketSymbol.split('/')[0].toLowerCase()
    },
    handleChange (newBaseCurrency) {
      this.baseCurrencyTitle = newBaseCurrency
    }
  }
}
</script>
