<template>
  <div class="container">
    <p>show trade history and balance info for symbol {{ symbol }}</p>
    <p>show balance over time</p>
    <p>show trading markets for this balance symbol</p>
    <router-link :to="`/buy/${symbol}`" class="btn btn-primary">Buy more</router-link>
    <router-link :to="`/sell/${symbol}`" class="btn btn-primary">Sell</router-link>
  </div>
</template>

<script>
export default {
  name: 'PageBalancesSymbol',
  computed: {
    symbol () {
      return (this.$route) ? this.$route.params.symbol : null
    }
  }
}
</script>
