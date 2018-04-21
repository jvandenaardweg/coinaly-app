<template>
  <list-group-markets :quote="marketQuote"></list-group-markets>
</template>

<script>
import ListGroupMarkets from '@/components/list-group/Markets'

export default {
  name: 'PageMarketsQuote',
  components: {
    ListGroupMarkets
  },
  computed: {
    marketQuote () {
      return (this.$route.params.quote) ? this.$route.params.quote : 'all'
    }
  }
}
</script>
