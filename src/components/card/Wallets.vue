<template>
  <div class="card card-100-xs">
    <div class="card-header">
      <search placeholder="Search for a wallet..." @search="handleSearch"></search>
    </div>

    <loader v-if="isLoading"></loader>

    <card-partial-empty :text="emptyText"></card-partial-empty>

    <div class="list-group list-group-flush" v-if="!isLoading">
      <div class="list-group-item list-group-item-wallet" v-for="symbol in searchedSymbols" :key="symbol">
        <div class="list-group-item-wallet-header">
          <div>
            <img class="mr-1" :src="currencyIconLocation(symbol)" width="18" :alt="symbol" />
            <strong>{{ symbol }}</strong>
            <span class="text-muted">{{ symbolName(symbol) }}</span>
          </div>
          <div class="ml-auto">
            <button type="button"
              class="btn btn-outline-primary btn-sm ml-auto"
              style="width: 120px"
              :class="{'active': showAddress(symbol), 'active is-loading': IsLoadingSymbol(symbol) }"
              @click.prevent="handleGetDepositAddress(symbol)">
            Deposit address</button>
          </div>
        </div>
        <div class="list-group-item-wallet-footer" v-if="getAddressBySymbol(symbol)">
          <div class="form-group m-0">
            <input type="text" name="address" :value="getAddressBySymbol(symbol)" class="form-control" @click.prevent="handleInputClick">
            <p class="text-success">Deposit address is copied to your clipboard!</p>
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
    showSymbol: null,
    loadingSymbol: null
  }),
  computed: {
    ...mapGetters({
      allMarketSymbols: 'markets/allMarketSymbols',
      isLoadingMarkets: 'markets/isLoading',
      totalMarketSymbols: 'markets/totalMarketSymbols',
      currencies: 'symbols/symbols',
      isLoadingSymbols: 'symbols/isLoading',
      getNameBySymbol: 'symbols/getNameBySymbol',
      getAddressBySymbol: 'deposits/getAddressBySymbol',
      isLoadingDeposits: 'deposits/isLoading'
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
    handleSort (sort) {
      console.log('sort by', sort)
    },
    IsLoadingSymbol (symbol) {
      return this.loadingSymbol === symbol
    },
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
    async handleGetDepositAddress (symbol) {
      this.loadingSymbol = symbol
      await this.$store.dispatch('deposits/getDepositAddress', {
        symbolId: symbol,
        forceRefresh: false
      })
      this.showSymbol = symbol
      this.loadingSymbol = null
    },
    handleSearch (searchQuery) {
      this.searchQuery = searchQuery
    },
    copyToClipboard (element) {
      element.select()
      document.execCommand('copy')
    },
    handleInputClick (event) {
      this.copyToClipboard(event.target)
    }
  }
}
</script>

<style lang="scss">
.list-group-item-wallet {
  .list-group-item-wallet-header {
    display: flex;
  }
  .list-group-item-wallet-footer {
    padding-top: 0.5rem;
    margin-top: 0.5rem;

    p {
      margin-bottom: 0;
      margin-top: 0.5rem;
    }
  }
}
</style>
