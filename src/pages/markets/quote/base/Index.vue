<template>
  <p>page market {{ market }}</p>
</template>

<script>
export default {
  name: 'PageMarketsMarket',
  computed: {
    market () {
      return (this.$route) ? `${this.$route.params.quote} ${this.$route.params.base}` : null
    }
  }
}
</script>
