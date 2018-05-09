<template>
  <div class="card card-100-xs">

    <div class="card-header">
      <h2 class="h5 m-0">Available markets ({{ totalMarkets }})</h2>
      <sub-nav v-if="hasMarkets" class="mt-3" :items="subNavItems" :selected="$route.params.quote"></sub-nav>
      <search v-if="hasMarkets" @search="handleSearch"></search>
    </div>

    <card-loading :is-loading="isLoading" :text="'Loading Markets...'"></card-loading>

    <card-empty :is-empty="!isLoadingMarkets && !hasMarkets" :text="'No markets available.'"></card-empty>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardLoading from '@/components/card/CardPartialLoading'
import CardEmpty from '@/components/card/CardPartialEmpty'
import SubNav from '@/components/SubNav'
import Search from '@/components/Search'

export default {
  name: 'CardMarkets',
  props: {
    quote: String
  },
  components: {
    CardLoading,
    CardEmpty,
    SubNav,
    Search
  },
  computed: {
    ...mapGetters({
      isLoadingMarkets: 'markets/isLoading',
      isLoadingTickers: 'tickers/isLoading',
      hasMarkets: 'markets/hasMarkets',
      allMarkets: 'markets/allMarkets',
      allQuoteMarkets: 'markets/allQuoteMarkets',
      totalMarkets: 'markets/totalMarkets',
      isLoadingCurrencies: 'currencies/isLoading'
    }),
    isLoading () {
      return this.isLoadingMarkets || this.isLoadingCurrencies || this.isLoadingTickers
    },
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
    }
  },
  methods: {
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
    handleSearch (searchQuery) {
      console.log('markets search', searchQuery)
    }
  }
}
</script>

<style lang="scss">
//
</style>
