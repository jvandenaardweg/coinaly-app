<template>
  <p>Show {{ marketQuote }} markets</p>
</template>

<script>
export default {
  name: 'PageMarketsQuote',
  computed: {
    marketQuote () {
      return (this.$route.params.quoteId) ? this.$route.params.quoteId : 'all'
    }
  }
}
</script>
