<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-10 col-md-10 col-lg-6 col-xl-6">
        <div class="text-center d-none d-sm-block">
          <h1 class="h2 mb-4">Select a balance</h1>
          <p class="text-muted">Which currency you want to use to buy {{ baseId }}?</p>
        </div>

        <card-balance-quote-markets :baseId="baseId"></card-balance-quote-markets>

      </div>
    </div>
  </div>
</template>

<script>
import CardBalanceQuoteMarkets from '@/components/card/BalanceQuoteMarkets'

export default {
  name: 'PageBuySelectQuote',
  components: {
    CardBalanceQuoteMarkets
  },
  computed: {
    baseId () {
      return this.$route.params.baseId
    }
  }
}
</script>
