<template>
  <div class="card card-100-xs">

    <loader v-if="isLoading"></loader>

    <card-partial-empty :text="emptyText"></card-partial-empty>

    <div v-if="!isLoading" class="list-group list-group-flush">
      <list-group-item-symbol-select
        v-for="(meta, symbol) in filteredBalances"
        :key="symbol"
        :symbol="symbol"
        :meta="meta.free.toString()"
        :currency="symbols[symbol]">
      </list-group-item-symbol-select>
    </div>

  </div>
</template>

<script>
import ListGroupItemSymbolSelect from '@/components/list-group-item/SymbolSelect'
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader'
import CardPartialEmpty from '@/components/card/PartialEmpty'
import pickBy from 'lodash/pickBy'

export default {
  name: 'CardSelectBalance',
  components: {
    Loader,
    CardPartialEmpty,
    ListGroupItemSymbolSelect
  },
  computed: {
    ...mapGetters({
      allFilledBalances: 'balances/allFilledBalances',
      hasBalances: 'balances/hasBalances',
      isLoadingBalances: 'balances/isLoading',
      isLoadingMarkets: 'markets/isLoading',
      isLoadingSymbols: 'symbols/isLoading',
      symbols: 'symbols/symbols',
      availableBaseMarkets: 'markets/availableBaseMarkets'
    }),
    isLoading () {
      return this.isLoadingBalances || this.isLoadingMarkets || this.isLoadingSymbols
    },
    emptyText () {
      if (!this.isLoading && !this.hasFilteredBalances) return 'No currencies available in your balance you can sell.'
      return null
    },
    hasFilteredBalances () {
      return Object.keys(this.filteredBalances).length > 0
    },
    filteredBalances () {
      // Match currencies in the balance with the available base markets
      // So the user does not select a currency that he can't sell
      return pickBy(this.allFilledBalances, (balance, symbolId) => {
        return Object.keys(this.availableBaseMarkets).some(baseId => {
          return baseId === symbolId
        })
      })
    }
  }
}
</script>
<style lang="scss">
//
</style>
