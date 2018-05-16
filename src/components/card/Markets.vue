<template>
  <div class="card card-100-xs">

    <div class="card-header">
      <h2 class="h5 m-0">Available markets ({{ totalMarkets }})</h2>
      <sub-nav v-if="hasMarkets" class="mt-3" :items="subNavItems" :selected="selected"></sub-nav>
      <search v-if="hasMarkets" @search="handleSearch"></search>
    </div>

    <loader v-if="isLoading"></loader>

    <card-partial-empty :text="emptyText"></card-partial-empty>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader'
import CardPartialEmpty from '@/components/card/PartialEmpty'
import SubNav from '@/components/SubNav'
import Search from '@/components/Search'

export default {
  name: 'CardMarkets',
  props: {
    quote: String
  },
  components: {
    CardPartialEmpty,
    SubNav,
    Search,
    Loader
  },
  computed: {
    ...mapGetters({
      isLoadingMarkets: 'markets/isLoading',
      isLoadingTickers: 'tickers/isLoading',
      isLoadingCurrencies: 'symbols/isLoading',
      hasMarkets: 'markets/hasMarkets',
      allQuoteMarkets: 'markets/allQuoteMarkets',
      totalMarkets: 'markets/totalMarkets'
    }),
    isLoading () {
      return this.isLoadingMarkets || this.isLoadingCurrencies || this.isLoadingTickers
    },
    emptyText () {
      if (!this.isLoadingMarkets && !this.hasMarkets) return 'No markets available.'
      return null
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
    },
    selected () {
      if (this.$route) return this.$route.params.quote
      return null
    }
  },
  methods: {
    handleSearch (searchQuery) {
      console.log('markets search', searchQuery)
    }
  }
}
</script>

<style lang="scss">
//
</style>
