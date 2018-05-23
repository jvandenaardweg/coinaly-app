<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-10 col-md-10 col-lg-6 col-xl-6">
        <div class="text-center d-none d-sm-block">
          <h1 class="h2 mb-4">Sell {{ baseId }} for ...?</h1>
          <p class="text-muted">The markets below are are tradable for {{ baseId }} on your exchange.</p>
        </div>
        <card-quote-markets
          :baseId="baseId">
        </card-quote-markets>
      </div>
    </div>
  </div>
</template>

<script>
import CardQuoteMarkets from '@/components/card/QuoteMarkets'

export default {
  name: 'PageSellSelectQuote',
  components: {
    CardQuoteMarkets
  },
  computed: {
    baseId () {
      return this.$store.state.route.params.baseId
    }
  }
}
</script>
