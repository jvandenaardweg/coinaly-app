<template>
  <div class="container">
    <p>show trade history and balance info for symbol {{ symbol }}</p>
    <p>We can also show trading markets using this balance</p>
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
