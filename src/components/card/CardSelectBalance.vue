<template>
  <div class="card">

    <loader v-if="!hasCurrencies && isLoading"></loader>

    <card-partial-empty :text="emptyText"></card-partial-empty>

    <div v-if="hasCurrencies" class="list-group list-group-flush">
      <list-group-item-symbol-select
        v-for="(meta, symbol, index) in allFilledBalances" :key="symbol"
        :symbol="symbol"
        :meta="meta.free.toString()"
        :currency="currencies[symbol]">
      </list-group-item-symbol-select>
    </div>

    <div class="card-footer" :class="{ 'd-none d-sm-block': !currency }">
      <router-link class="btn btn-primary btn-lg btn-block" :to="routeUrl" :class="{'disabled': !currency}" :disabed="!currency">{{ nextStepAction }}</router-link>
    </div>

  </div>
</template>

<script>
import ListGroupItemSymbolSelect from '@/components/list-group-item/SymbolSelect'
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader'
import CardPartialEmpty from '@/components/card/PartialEmpty'

export default {
  name: 'CardSelectBalance',
  props: ['preselectedCurrency', 'nextStepAction', 'routeBase'],
  components: {
    Loader,
    CardPartialEmpty,
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
      currencies: 'symbols/symbols'
    }),
    routeUrl () {
      return `/${this.routeBase}/${this.currency}`
    },
    emptyText () {
      if (!this.hasCurrencies) return 'No currencies available in your balance.'
      return null
    }
  },
  methods: {
    currencyName (symbol) {
      return (this.currenciesCurrency[symbol]) ? this.currenciesCurrency[symbol].name : null
    },
    currencyIconLocation (symbol) {
      return (this.currenciesCurrency[symbol]) ? this.currenciesCurrency[symbol].icon_uri : null
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
