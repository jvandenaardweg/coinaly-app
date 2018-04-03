<template>
  <div class="card">

    <CardLoading :is-loading="isLoadingMarkets" :text="'Loading Markets...'"></CardLoading>

    <CardEmpty :is-loading="isLoadingMarkets" :text="'Loading Markets...'"></CardEmpty>

    <ul v-if="hasMarkets" class="list-group list-group-flush">
      <li v-for="(meta, symbol, index) in quoteCurrencyMarkets" :key="symbol" :index="index" class="list-group-item d-flex justify-content-between align-items-center" :class="{'active': baseCurrency === marketNameToSymbol(symbol) }" @click="setSelected(symbol)">
        <div class="custom-control custom-radio">
          <img :src="`static/icons/cryptocurrencies/svg/color/${marketNameToSymbol(symbol).toLowerCase()}.svg`" width="18" class="mr-1" :alt="marketNameToSymbol(symbol)" />
          <input type="radio" :id="`baseCurrency-${marketNameToSymbol(symbol)}`" name="baseCurrency" v-model="baseCurrency" :value="marketNameToSymbol(symbol)" class="custom-control-input">
          <label class="custom-control-label" :for="`baseCurrency-${marketNameToSymbol(symbol)}`"><strong>{{ marketNameToSymbol(symbol) }}</strong> <span class="text-muted">({{ $store.state.symbols[marketNameToSymbol(symbol)] }})</span></label>
        </div>
        <span class="badge" v-if="isAvailable(symbol)">Available</span>
      </li>
    </ul>
    <div class="card-footer">
      <router-link class="btn btn-primary btn-block" :to="`/${routeBase}`" :class="{'disabled': !baseCurrency}" :disabed="!baseCurrency">{{ nextStepAction }}</router-link>
    </div>

  </div>
</template>

<script>
import CardLoading from './card/CardLoading'
import CardEmpty from './card/CardEmpty'

export default {
  name: 'SelectCurrency',
  props: [
    'quoteCurrencyMarkets',
    'allFilledCurrencies',
    'isLoadingMarkets',
    'previousBaseCurrency',
    'nextStepAction',
    'routeBase'
  ],
  components: {
    CardLoading,
    CardEmpty
  },
  data () {
    return {
      showSmartTradeInfo: false,
      baseCurrency: this.previousBaseCurrency
    }
  },
  computed: {
    hasMarkets () {
      return Object.keys(this.quoteCurrencyMarkets).length
    }
  },
  methods: {
    isAvailable (marketSymbol) {
      return Object.keys(this.allFilledCurrencies).includes(marketSymbol.split('/')[1])
    },
    setSelected (marketName) {
      this.baseCurrency = this.marketNameToSymbol(marketName)
    },
    marketNameToSymbol (marketName) {
      return marketName.split('/')[0]
    }
  },
  watch: {
    'baseCurrency': function (newValue, oldValue) {
      this.$emit('change', newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-group-item,
label {
  cursor: pointer;
}
</style>
