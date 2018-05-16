<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-10 col-md-10 col-lg-6 col-xl-6">
        <div class="text-center">
          <h1 class="h2 mb-4">Select a balance</h1>
          <p class="text-muted">Which currency you want to use to buy {{ baseId }}?</p>
        </div>

        <card-quote-markets :baseId="baseId"></card-quote-markets>

      </div>
    </div>
  </div>
</template>

<script>
import CardQuoteMarkets from '@/components/card/QuoteMarkets'

export default {
  name: 'PageBuySelectQuote',
  components: {
    CardQuoteMarkets
  },
  computed: {
    baseId () {
      return this.$route.params.baseId
    }
  }
}
</script>
