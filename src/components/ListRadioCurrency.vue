<template>
  <ul class="list-group list-group-flush">
    <li v-if="!hasCurrencies" class="list-group-item">
      <p class="m-0 text-center font-weight-bold text-muted">No currencies available.</p>
    </li>
    <li v-for="(meta, symbol, index) in currencies" :key="symbol" :id="`list-group-item-${symbol}`" :index="index" class="list-group-item d-flex justify-content-between align-items-center" :class="{'active': isActive(symbol) }" @click="setSelected(symbol)">
      <div class="custom-control custom-radio">
        <img :src="symbolIconLocation(symbol)" :id="`list-group-item-icon-${symbol}`" width="18" class="mr-1" :alt="symbol" />
        <input type="radio" :id="`currency-${symbol}`" :ref="symbol" name="currency" v-model="currency" :value="symbol" class="custom-control-input">
        <label class="custom-control-label" :for="`currency-${symbol}`">
          <strong>{{ symbol }}</strong>
          <span class="text-muted">(<span :id="`list-group-item-name-${symbol}`">{{ symbolToName(symbol) }}</span>)</span>
        </label>
      </div>
      <span class="text-muted"><span :id="`list-group-item-amount-${symbol}`">{{ meta.free | number }} {{ symbol }}</span></span>
    </li>
  </ul>
</template>

<script>
import { symbolToName, symbolIconLocation } from '@/helpers/symbols'

export default {
  name: 'ListRadioCurrency',
  props: ['currencies', 'activeCurrency'],
  data () {
    return {
      currency: this.activeCurrency
    }
  },
  methods: {
    symbolToName,
    symbolIconLocation,
    setSelected (symbol) {
      this.currency = symbol
    },
    isActive (symbol) {
      return (this.currency === symbol || this.activeCurrency === symbol) || false
    }
  },
  computed: {
    hasCurrencies () {
      if (!this.currencies) return false
      return Object.keys(this.currencies).length
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
