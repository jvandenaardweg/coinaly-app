<template>
  <div class="card">

    <CardLoading :is-loading="isLoadingMarkets" :text="'Loading Markets...'"></CardLoading>

    <CardEmpty
      :is-empty="!isLoadingMarkets && !hasMarkets"
      :text="`No selling markets available for ${quoteCurrency}.`"
      :actionLink="'/sell'"
      :actionLabel="'Select different currency'">
    </CardEmpty>

    <ListGroupSelectMarkets
      v-if="!isLoadingMarkets"
      :markets="quoteCurrencyMarkets"
      :balances="allFilledCurrencies"
      :activeCurrency="baseCurrency"
      @selectedCurrency="handleSelectedCurrency">
    </ListGroupSelectMarkets>

    <div class="card-footer">
      <router-link class="btn btn-primary btn-block" :to="`/${routeBase}/${quoteCurrency}/${baseCurrency}`" :class="{'disabled': !baseCurrency}" :disabed="!baseCurrency">{{ nextStepAction }}</router-link>
    </div>

  </div>
</template>

<script>
import CardLoading from '@/components/card/CardLoading'
import CardEmpty from '@/components/card/CardEmpty'
import ListGroupSelectMarkets from '@/components/list-group/ListGroupSelectMarkets'

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
    CardEmpty,
    ListGroupSelectMarkets
  },
  data () {
    return {
      baseCurrency: this.previousBaseCurrency
    }
  },
  computed: {
    hasMarkets () {
      if (!this.quoteCurrencyMarkets) return false
      return Object.keys(this.quoteCurrencyMarkets).length > 0
    }
  },
  methods: {
    handleSelectedCurrency (symbol) {
      this.baseCurrency = symbol
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
