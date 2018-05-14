<template>
  <div class="d-flex">
    <div class="custom-control custom-radio">
      <input type="radio" :id="`currency-${symbol}`" :ref="symbol" name="currency" v-model="currency" :value="symbol" class="custom-control-input">
      <label class="custom-control-label" :for="`currency-${symbol}`">
        <img :src="iconLocation" :id="`list-group-item-icon-${symbol}`" width="18" class="mr-1" :alt="symbol" />
        <strong>{{ symbol }}</strong>
        <span class="text-muted">(<span :id="`list-group-item-name-${symbol}`">{{ currency.name }}</span>)</span>
      </label>
    </div>
    <span class="text-muted d-none d-sm-block"><span :id="`list-group-item-amount-${symbol}`">{{ balance.free | number }}</span></span>
  </div>
</template>

<script>

export default {
  name: 'ListGroupItemMarketSimple',
  props: {
    symbol: {
      type: String,
      required: true
    },
    currency: {
      type: Object,
      required: true
    },
    balance: {
      type: Object,
      required: true
    }
  },
  computed: {
    iconLocation () {
      if (this.currency) {
        return this.currency.icon_uri
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="scss">
//
</style>
