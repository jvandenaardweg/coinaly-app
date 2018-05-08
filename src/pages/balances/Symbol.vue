<template>
  <p>show trade history and balance info for symbol {{ symbol }}</p>
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
