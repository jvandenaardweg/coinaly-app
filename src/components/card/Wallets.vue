<template>
  <div class="card card-100-xs">
    <div class="card-header">
      <search placeholder="Search for a wallet..." @search="handleSearch"></search>
    </div>

    <loader v-if="isLoading"></loader>

    <card-partial-empty :text="emptyText"></card-partial-empty>

    <div class="list-group list-group-flush" v-if="!isLoading">
      <div class="list-group-item" v-for="symbol in searchedSymbols" :key="symbol">
        <div class="d-flex">
          <div>
            <img :src="currencyIconLocation(symbol)" width="18" />
            <strong>{{ symbol }}</strong>
            <span class="text-muted">{{ symbolName(symbol) }}</span>
          </div>
          <div class="ml-auto">
            <button type="button" class="btn btn-outline-primary btn-sm ml-auto" @click.prevent="handleClick(symbol)">Deposit address</button>
          </div>
        </div>
        <div class="address" v-if="showAddress(symbol)">
          <div class="form-group">
            <input type="text" name="address" value="address" class="form-control" @click.prevent="handleInputClick">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader'
import Search from '@/components/Search'
import CardPartialEmpty from '@/components/card/PartialEmpty'

export default {
  name: 'CardWallets',
  components: {
    Loader,
    Search,
    CardPartialEmpty
  },
  data: () => ({
    searchQuery: null,
    showSymbol: null
  }),
  computed: {
    ...mapGetters({
      allMarketSymbols: 'markets/allMarketSymbols',
      isLoadingMarkets: 'markets/isLoading',
      totalMarketSymbols: 'markets/totalMarketSymbols',
      currencies: 'symbols/symbols',
      isLoadingSymbols: 'symbols/isLoading',
      getNameBySymbol: 'symbols/getNameBySymbol'
    }),
    isLoading () {
      return this.isLoadingSymbols || this.isLoadingMarkets
    },
    searchedSymbols () {
      // TODO: sort symbols by balance
      if (this.searchQuery) {
        return this.allMarketSymbols.filter(element => element.toLowerCase().includes(this.searchQuery.toLowerCase()))
      } else {
        return this.allMarketSymbols
      }
    },
    emptyText () {
      if (!this.isLoading && !this.searchedSymbols.length) return `No wallet found for <strong>${this.searchQuery}</strong>`
      return null
    }
  },
  methods: {
    currencyIconLocation (symbol) {
      return (this.currencies[symbol]) ? this.currencies[symbol].icon_uri : null
    },
    symbolName (symbol) {
      const name = this.getNameBySymbol(symbol)
      if (name) return `(${name})`
      return null
    },
    showAddress (symbol) {
      return this.showSymbol === symbol
    },
    handleClick (symbol) {
      this.showSymbol = symbol
      console.log('click')
      window.alert('should copy to clipboard')
    },
    handleSearch (searchQuery) {
      this.searchQuery = searchQuery
    },
    handleInputClick (event) {
      window.alert('should copy to clipboard')
    }
  }
}
</script>

<style lang="scss">
.address {
  // border-top: 1px $border-color solid;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
}
</style>
