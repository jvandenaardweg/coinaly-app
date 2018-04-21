<template>
  <div class="list-group list-group-flush">
    <router-link :to="marketLink(meta.base, meta.quote)" v-if="isWithinPageLimit(index)" v-for="(meta, symbol, index) in filteredMarkets" :key="symbol" :index="index" class="list-group-item list-group-item-action">
      <ListGroupItemMarket :market="meta" :ticker="allTickers[symbol]" :favorite="isFavoriteMarket(symbol)" :hideVolume="false"></ListGroupItemMarket>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListGroupItemMarket from '@/components/list-group-item/Market'
import pickBy from 'lodash/pickBy'

export default {
  name: 'ListGroupMarkets',
  props: {
    quote: String
  },
  components: {
    ListGroupItemMarket
  },
  data () {
    return {
      marketIndex: null,
      paginationLimit: 20
    }
  },
  computed: {
    ...mapGetters({
      isLoadingMarkets: 'markets/isLoading',
      hasMarkets: 'markets/hasMarkets',
      allMarkets: 'markets/allMarkets',
      allQuoteMarkets: 'markets/allQuoteMarkets',
      totalMarkets: 'markets/totalMarkets',
      allTickers: 'tickers/allTickers',
      selectedExchange: 'exchanges/selected',
      userMarketFavorites: 'user/marketFavorites'
    }),
    subNavItems () {
      let items = [
        { label: 'All', slug: '', uri: '/markets' }
      ]

      Object.keys(this.allQuoteMarkets).forEach(key => {
        items.push(
          {
            label: key,
            slug: key.toLowerCase(),
            uri: `/markets/${key}`
          }
        )
      })

      return items
    },
    filteredMarkets () {
      if (this.quote === 'all') {
        return this.allMarkets
      } else {
        return pickBy(this.allMarkets, (values, marketSymbol) => {
          return marketSymbol.includes(`/${this.quote}`)
        })
      }
    }
  },
  methods: {
    isFavoriteMarket (symbol) {
      return Boolean(this.userMarketFavorites[this.selectedExchange][symbol])
    },
    isWithinPageLimit (index) {
      this.marketsIndex = index
      if (index < this.paginationLimit) {
        return true
      } else {
        return false
      }
    },
    handleShowAllMarkets () {
      this.paginationLimit = 9999
    },
    marketLink (base, quote) {
      if (base && quote) return `/markets/${quote}/${base}`
      return `/markets/${quote}`
    }
  }
}
</script>