<template>
  <p>Show {{ marketQuote }} markets</p>
</template>

<script>
export default {
  name: 'PageMarketsQuote',
  computed: {
    marketQuote () {
      return (this.$route.params.quote) ? this.$route.params.quote : 'all'
    }
  }
}
</script>
