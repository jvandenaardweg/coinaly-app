<template>
  <ul class="list-group list-group-flush">
    <li v-if="!hasMarkets" class="list-group-item">
      <p class="m-0 text-center font-weight-bold text-muted">No markets available.</p>
    </li>
    <li v-for="(meta, marketSymbol, index) in markets" :key="marketSymbol" :id="`list-group-item-${marketSymbol}`" :index="index" class="list-group-item d-flex justify-content-between align-items-center" :class="{'active': isActive(marketSymbolToBaseSymbol(marketSymbol)) }" @click="setSelected(marketSymbolToBaseSymbol(marketSymbol))">
      <div class="custom-control custom-radio">
        <img :src="symbolIconLocation(marketSymbolToBaseSymbol(marketSymbol))" :id="`list-group-item-icon-${marketSymbol}`" width="18" class="mr-1" :alt="marketSymbolToBaseSymbol(marketSymbol)" />
        <input type="radio" :id="`market-${marketSymbol}`" :ref="marketSymbol" name="market" v-model="currency" :value="marketSymbolToBaseSymbol(marketSymbol)" class="custom-control-input">
        <label class="custom-control-label" :for="`market-${marketSymbol}`">
          <strong>{{ marketSymbolToBaseSymbol(marketSymbol) }}</strong>
          <span class="text-muted">(<span :id="`list-group-item-name-${marketSymbol}`">{{ symbolToName(marketSymbolToBaseSymbol(marketSymbol)) }}</span>)</span>
        </label>
      </div>
      <span class="text-muted"><span :id="`list-group-item-amount-${marketSymbol}`">~ {{ maxSellPrice(marketSymbol) | number }} {{ marketSymbolToBaseSymbol(marketSymbol) }}</span></span>
    </li>
  </ul>
</template>

<script>
import { symbolToName, symbolIconLocation, marketSymbolToBaseSymbol, marketSymbolToQuoteSymbol } from '@/helpers/symbols'

export default {
  name: 'ListRadioMarkets',
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
    maxSellPrice (marketSymbol) {
      const quoteCurrencyBalance = this.balances[this.marketSymbolToQuoteSymbol(marketSymbol)]
      const quoteCurrencyMarket = this.markets[marketSymbol]
      if (quoteCurrencyBalance && quoteCurrencyMarket) return quoteCurrencyBalance.free * quoteCurrencyMarket.last
      return null
    }
  },
  computed: {
    hasMarkets () {
      if (!this.markets) return false
      return Object.keys(this.markets).length
    }
  },
  watch: {
    currency: function (newValue, oldValue) {
      this.$emit('selectedCurrency', newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/bootstrap/setting";

.list-group-item,
label {
  cursor: pointer;
}

.list-group-item {
  &:not(.active) {
    &:hover {
      background-color: $light;
    }
  }
}
</style>
