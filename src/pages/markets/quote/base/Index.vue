<template>
  <div class="container">
    <p>page market {{ market }}</p>
  </div>
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
