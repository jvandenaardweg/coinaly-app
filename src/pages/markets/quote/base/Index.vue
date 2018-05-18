<template>
  <div class="container">

    <card-chart :marketSymbol="marketSymbol" :baseId="baseId" :quoteId="quoteId" class="mb-5"></card-chart>

    <div class="card">
      <div class="card-body">
        <button type="button" class="btn btn-outline-primary">View candlestick chart</button>
        <button type="button" class="btn btn-outline-primary" @click.prevent="handleClickRefresh"><icon name="refresh-ccw" stroke="#2E85DE"></icon> &nbsp; Refresh chart</button>
        <!-- <button type="button" class="btn btn-primary">Buy BTC</button> -->
        <router-link :to="`/buy/${baseId}/${quoteId}`"  class="btn btn-primary"><icon name="download" stroke="#fff"></icon> &nbsp; Buy {{ baseId }} with {{ quoteId }}</router-link>
        <router-link :to="`/sell/${baseId}/${quoteId}`" class="btn btn-primary"><icon name="upload" stroke="#fff"></icon> &nbsp; Sell {{ baseId }} for {{ quoteId }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import CardChart from '@/components/card/Chart.vue'
import Icon from '@/components/Icon'

export default {
  name: 'PageMarketsMarket',
  components: {
    CardChart,
    Icon
  },
  computed: {
    baseId () {
      return (this.$route) ? this.$route.params.baseId : null
    },
    quoteId () {
      return (this.$route) ? this.$route.params.quoteId : null
    },
    marketSymbol () {
      return (this.$route && this.baseId && this.quoteId) ? `${this.baseId}/${this.quoteId}` : null
    }
  },
  methods: {
    handleClickRefresh (event) {
      this.dispatchGetOHLCV(this.marketSymbol, true)
    },
    dispatchGetOHLCV (marketSymbol, forceRefresh = false) {
      const payload = {
        marketSymbol: marketSymbol,
        interval: '1h',
        forceRefresh: forceRefresh
      }
      this.$store.dispatch('markets/getOHLCV', payload)
    }
  }
}
</script>
