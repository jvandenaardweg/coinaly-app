<template>
  <div class="card">

    <CardLoading :isLoading="!hasCurrencies && isLoading" :text="'Loading Balances...'"></CardLoading>

    <CardEmpty :isEmpty="!hasCurrencies" :text="'No currencies available in your balance.'"></CardEmpty>

    <div v-if="hasCurrencies" class="list-group list-group-flush">
      <list-group-item-symbol-select
        v-for="(meta, symbol, index) in allFilledBalances" :key="symbol"
        :symbol="symbol"
        :meta="meta.free"
        :currency="currencies[symbol]">
      </list-group-item-symbol-select>

      <!-- <li v-for="(meta, symbol, index) in allFilledBalances" :key="symbol" :id="`list-group-item-${symbol}`" :index="index" class="list-group-item d-flex justify-content-between align-items-center" :class="{'active': isActive(symbol) }" @click="setSelected(symbol)">
        <div class="custom-control custom-radio">
          <input type="radio" :id="`currency-${symbol}`" :ref="symbol" name="currency" v-model="currency" :value="symbol" class="custom-control-input">
          <label class="custom-control-label" :for="`currency-${symbol}`">
            <img :src="currencyIconLocation(symbol)" :id="`list-group-item-icon-${symbol}`" width="18" class="mr-1" :alt="symbol" />
            <strong>{{ symbol }}</strong>
            <span class="text-muted">(<span :id="`list-group-item-name-${symbol}`">{{ currencyName(symbol) }}</span>)</span>
          </label>
        </div>
        <span class="text-muted d-none d-sm-block"><span :id="`list-group-item-amount-${symbol}`">{{ meta.free | number }} {{ symbol }}</span></span>
      </li> -->
    </div>

    <div class="card-footer" :class="{ 'd-none d-sm-block': !currency }">
      <router-link class="btn btn-primary btn-lg btn-block" :to="routeUrl" :class="{'disabled': !currency}" :disabed="!currency">{{ nextStepAction }}</router-link>
    </div>

  </div>
</template>

<script>
import ListGroupItemSymbolSelect from '@/components/list-group-item/SymbolSelect'
import { symbolToName, symbolIconLocation } from '@/helpers/symbols'
import { mapGetters } from 'vuex'
import CardLoading from '@/components/card/CardPartialLoading'
import CardEmpty from '@/components/card/CardPartialEmpty'

export default {
  name: 'CardSelectBalance',
  props: ['preselectedCurrency', 'nextStepAction', 'routeBase'],
  components: {
    CardLoading,
    CardEmpty,
    ListGroupItemSymbolSelect
  },
  data () {
    return {
      currency: this.preselectedCurrency || null
    }
  },
  computed: {
    ...mapGetters({
      allFilledBalances: 'balances/allFilledBalances',
      hasCurrencies: 'balances/hasCurrencies',
      isLoading: 'balances/isLoading',
      currencies: 'currencies/currency'
    }),
    routeUrl () {
      return `/${this.routeBase}/${this.currency}`
    }
  },
  methods: {
    symbolToName,
    symbolIconLocation,
    currencyName (symbol) {
      return (this.currenciesCurrency[symbol]) ? this.currenciesCurrency[symbol].name : null
    },
    currencyIconLocation (symbol) {
      return (this.currenciesCurrency[symbol]) ? this.currenciesCurrency[symbol].iconLocation : null
    },
    handleSelectedCurrency (symbol) {
      this.currency = symbol
    },
    isActive (symbol) {
      return (this.currency === symbol || this.activeCurrency === symbol) || false
    },
    setSelected (symbol) {
      this.currency = symbol
    }
  }
}
</script>
<style lang="scss">
//
</style>
