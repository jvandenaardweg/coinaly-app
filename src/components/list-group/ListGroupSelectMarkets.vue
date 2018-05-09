<template>
  <ul class="list-group list-group-flush">
    <li v-for="(meta, marketSymbol, index) in markets" :key="marketSymbol" :id="`list-group-item-${marketSymbolToBaseSymbol(marketSymbol)}`" :index="index" class="list-group-item d-flex justify-content-between align-items-center" :class="{'active': isActive(marketSymbolToBaseSymbol(marketSymbol)) }" @click="setSelected(marketSymbolToBaseSymbol(marketSymbol))">
      <div class="custom-control custom-radio">
        <img :src="symbolIconLocation(marketSymbolToBaseSymbol(marketSymbol))" :id="`list-group-item-icon-${marketSymbolToBaseSymbol(marketSymbol)}`" width="18" class="mr-1" :alt="marketSymbolToBaseSymbol(marketSymbol)" />
        <input type="radio" :id="`market-${marketSymbol}`" :ref="marketSymbol" name="market" v-model="currency" :value="marketSymbolToBaseSymbol(marketSymbol)" class="custom-control-input">
        <label class="custom-control-label" :for="`market-${marketSymbol}`">
          <strong :id="`list-group-item-symbol-${marketSymbolToBaseSymbol(marketSymbol)}`">{{ marketSymbolToBaseSymbol(marketSymbol) }}</strong>
          <span class="text-muted">(<span :id="`list-group-item-name-${marketSymbolToBaseSymbol(marketSymbol)}`">{{ symbolToName(marketSymbolToBaseSymbol(marketSymbol)) }}</span>)</span>
        </label>
      </div>
      <span class="text-muted"><span :id="`list-group-item-amount-${marketSymbolToBaseSymbol(marketSymbol)}`">{{ marketLast(marketSymbol) }} {{ marketSymbolToBaseSymbol(marketSymbol) }}</span></span>
    </li>
  </ul>
</template>

<script>
import { symbolToName, symbolIconLocation, marketSymbolToBaseSymbol, marketSymbolToQuoteSymbol } from '@/helpers/symbols'

export default {
  name: 'ListGroupSelectMarkets',
  props: ['markets', 'balances', 'activeCurrency'],
  data () {
    return {
      currency: this.activeCurrency
    }
  },
  methods: {
    symbolToName,
    symbolIconLocation,
    marketSymbolToBaseSymbol,
    marketSymbolToQuoteSymbol,
    setSelected (symbol) {
      this.currency = symbol
    },
    isActive (symbol) {
      return (this.currency === symbol || this.activeCurrency === symbol) || false
    },
    marketLast (marketSymbol) {
      return this.markets[marketSymbol].last
    }
  },
  computed: {
    hasMarkets () {
      if (!this.markets) return false
      return Object.keys(this.markets).length > 0
    }
  },
  watch: {
    currency: function (newValue, oldValue) {
      this.$emit('selectedCurrency', newValue)
    }
  }
}
</script>

<style lang="scss">
//
</style>
