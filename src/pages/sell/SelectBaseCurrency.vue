<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5">
        <div class="text-center d-none d-sm-block">
          <h1 class="h2 mb-4">Sell {{ quoteId }} for {{ baseIdTitle }}</h1>
          <p class="text-muted">The markets below are are tradable for {{ quoteId }} on your exchange [Bittrex].</p>
        </div>
        <CardSelectMarket
          @change="handleChange"
          :quoteMarkets="quoteMarkets"
          :allMarkets="allMarkets"
          :allFilledBalances="allFilledBalances"
          :isLoadingMarkets="isLoadingMarkets"
          :previousBaseId="previousBaseId"
          :quoteId="quoteId"
          :nextStepAction="'Next step: Pricing'"
          :currencySymbols="$store.state.symbols"
          :routeBase="'sell'">
        </CardSelectMarket>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pickBy from 'lodash/pickBy'
import CardSelectMarket from '@/components/card/CardSelectMarket'
// import store from '../../store'
// import router from '../../router'

export default {
  name: 'PageSellSelectBaseCurrency',
  components: {
    CardSelectMarket
  },
  data () {
    return {
      previousBaseId: (this.$store.state.route.from) ? this.$store.state.route.from.params.baseId : null,
      quoteId: this.$store.state.route.params.quoteId,
      baseIdTitle: '...?'
    }
  },
  computed: {
    ...mapGetters({
      allCurrencies: 'balances/allCurrencies',
      allFilledBalances: 'balances/allFilledBalances',
      allMarkets: 'markets/allMarkets',
      isLoadingMarkets: 'markets/isLoading'
    }),
    quoteMarkets () {
      return pickBy(this.allMarkets, (values, marketSymbol) => {
        return marketSymbol.includes(`${this.quoteId}/`)
      })
    }
  },
  methods: {
    handleChange (baseId) {
      this.baseIdTitle = baseId
    }
  }
  // beforeRouteEnter (to, from, next) {
  //   // Check if the selected quoteId is in the balance of the user
  //   const balances = store.state.balances.currencies
  //   const isInBalance = balances[to.params.quoteId]
  //   if (isInBalance) {
  //     next()
  //   } else {
  //     router.push('/sell')
  //   }
  // }
}
</script>
