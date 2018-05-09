<template>
  <div class="row justify-content-center">
    <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5">
      <div class="text-center d-none d-sm-block">
        <h1 class="h2 mb-4">Sell {{ quoteCurrency }} for {{ baseCurrencyTitle }}</h1>
        <p class="text-muted">The markets below are are tradable for {{ quoteCurrency }} on your exchange [Bittrex].</p>
      </div>
      <CardSelectMarket
        @change="handleChange"
        :quoteCurrencyMarkets="quoteCurrencyMarkets"
        :allMarkets="allMarkets"
        :allFilledBalances="allFilledBalances"
        :isLoadingMarkets="isLoadingMarkets"
        :previousBaseCurrency="previousBaseCurrency"
        :quoteCurrency="quoteCurrency"
        :nextStepAction="'Next step: Pricing'"
        :currencySymbols="$store.state.symbols"
        :routeBase="'sell'">
      </CardSelectMarket>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import pickBy from 'lodash/pickBy'
import CardSelectMarket from '@/components/card/CardSelectMarket'
import store from '../../store'
import router from '../../router'

export default {
  name: 'PageSellSelectBaseCurrency',
  components: {
    CardSelectMarket
  },
  data () {
    return {
      previousBaseCurrency: (this.$store.state.route.from) ? this.$store.state.route.from.params.baseCurrency : null,
      quoteCurrency: this.$store.state.route.params.quoteCurrency,
      baseCurrencyTitle: '...?'
    }
  },
  computed: {
    ...mapGetters({
      allCurrencies: 'balances/allCurrencies',
      allFilledBalances: 'balances/allFilledBalances',
      allMarkets: 'markets/allMarkets',
      isLoadingMarkets: 'markets/isLoading'
    }),
    quoteCurrencyMarkets () {
      return pickBy(this.allMarkets, (values, marketSymbol) => {
        return marketSymbol.includes(`${this.quoteCurrency}/`)
      })
    }
  },
  methods: {
    handleChange (newBaseCurrency) {
      this.baseCurrencyTitle = newBaseCurrency
    }
  },
  beforeRouteEnter (to, from, next) {
    // Check if the selected quoteCurrency is in the balance of the user
    const balances = store.state.balances.currencies
    const isInBalance = balances[to.params.quoteCurrency]
    if (isInBalance) {
      next()
    } else {
      router.push('/sell')
    }
  }
}
</script>
