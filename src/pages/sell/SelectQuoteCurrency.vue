<template>
  <div class="row justify-content-center">
    <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5">
      <div class="text-center">
        <h1 class="h2 mb-4">What are you selling?</h1>
        <p class="text-muted">The currencies below are what's in your current balance.</p>
      </div>
      <SelectBalance
        :allFilledCurrencies="allFilledCurrencies"
        :previousQuoteCurrency="previousQuoteCurrency"
        :nextStepAction="'Next step: Market'"
        :routeBase="'sell'">
        </SelectBalance>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SelectBalance from '../../components/SelectBalance'

export default {
  name: 'PageSellSelectQuoteCurrency',
  components: {
    SelectBalance
  },
  data () {
    return {
      previousQuoteCurrency: (this.$store.state.route.from) ? this.$store.state.route.from.params.quoteCurrency : null
    }
  },
  computed: {
    ...mapGetters({
      allFilledCurrencies: 'balances/allFilledCurrencies'
    })
  }
}
</script>
