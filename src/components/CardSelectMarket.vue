<template>
  <div class="card">

    <CardLoading :is-loading="isLoadingMarkets" :text="'Loading Markets...'"></CardLoading>

    <ListRadioMarkets
      v-if="!isLoadingMarkets"
      :markets="quoteCurrencyMarkets"
      :balances="allFilledCurrencies"
      :activeCurrency="baseCurrency"
      @selectedCurrency="handleSelectedCurrency">
    </ListRadioMarkets>

    <div class="card-footer">
      <router-link class="btn btn-primary btn-block" :to="`/${routeBase}/${quoteCurrency}/${baseCurrency}`" :class="{'disabled': !baseCurrency}" :disabed="!baseCurrency">{{ nextStepAction }}</router-link>
    </div>

  </div>
</template>

<script>
import CardLoading from '@/components/CardLoading'
import EmptyCard from '@/components/EmptyCard'
import ListRadioMarkets from '@/components/ListRadioMarkets'

export default {
  name: 'CardSelectMarket',
  props: [
    'quoteCurrencyMarkets',
    'allFilledCurrencies',
    'allMarkets',
    'isLoadingMarkets',
    'previousBaseCurrency',
    'quoteCurrency',
    'nextStepAction',
    'currencySymbols',
    'routeBase'
  ],
  components: {
    CardLoading,
    EmptyCard,
    ListRadioMarkets
  },
  data () {
    return {
      showSmartTradeInfo: false,
      baseCurrency: this.previousBaseCurrency
    }
  },
  computed: {
    hasMarkets () {
      return Object.keys(this.quoteCurrencyMarkets).length > 0
    }
  },
  methods: {
    setSelected (marketSymbol) {
      this.baseCurrency = this.marketSymbolToBaseSymbol(marketSymbol)
    },
    handleSelectedCurrency (symbol) {
      this.baseCurrency = symbol
    },
    marketSymbolToBaseSymbol (marketSymbol) {
      return marketSymbol.split('/')[1]
    },
    maxSellPrice (marketSymbol) {
      const quoteCurrencyBalance = this.allFilledCurrencies[this.quoteCurrency]
      const quoteCurrencyMarket = this.allMarkets[marketSymbol]
      if (quoteCurrencyBalance && quoteCurrencyMarket) return quoteCurrencyBalance.free * quoteCurrencyMarket.last
      return null
    },
    fullCurrencyName (marketSymbol) {
      const currencyFullName = this.currencySymbols[this.marketSymbolToBaseSymbol(marketSymbol)]
      if (currencyFullName) return currencyFullName
      return null
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
