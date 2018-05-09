<template>
  <div class="row justify-content-center">
    <div class="col-sm-10 col-md-10 col-lg-6 col-xl-6">
      <div class="text-center">
        <h1 class="h3 mb-2">What are you selling?</h1>
        <p class="text-muted">The currencies below are what's in your current balance.</p>
      </div>
      <CardSelectBalance
        :preselectedCurrency="preselectedCurrency"
        :nextStepAction="'Next step: Market'"
        :routeBase="'sell'">
      </CardSelectBalance>
    </div>
  </div>
</template>

<script>
import CardSelectBalance from '@/components/card/CardSelectBalance'

export default {
  name: 'PageSellSelectQuoteCurrency',
  components: {
    CardSelectBalance
  },
  data () {
    return {
      preselectedCurrency: (this.$store.state.route.from) ? this.$store.state.route.from.params.quoteCurrency : null
    }
  }
}
</script>
