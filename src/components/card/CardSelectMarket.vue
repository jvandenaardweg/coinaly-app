<template>
  <div class="card">

    <loader v-if="isLoadingMarkets"></loader>

    <CardPartialEmpty
      :is-empty="!isLoadingMarkets && !hasMarkets"
      :text="`No selling markets available for ${quoteId}.`"
      :actionLink="'/sell'"
      :actionLabel="'Select different currency'">
    </CardPartialEmpty>

    [list markets]

    <div class="card-footer">
      <router-link class="btn btn-primary btn-lg btn-block" :to="routeUrl" :class="{'disabled': !baseCurrency}" :disabed="!baseCurrency">{{ nextStepAction }}</router-link>
    </div>

  </div>
</template>

<script>
import Loader from '@/components/Loader'
import CardPartialEmpty from '@/components/card/PartialEmpty'

export default {
  name: 'CardSelectMarket',
  props: [
    'quoteCurrencyMarkets',
    'allFilledBalances',
    'allMarkets',
    'isLoadingMarkets',
    'previousBaseCurrency',
    'quoteId',
    'nextStepAction',
    'currencySymbols',
    'routeBase'
  ],
  components: {
    Loader,
    CardPartialEmpty
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
    },
    routeUrl () {
      return `/${this.routeBase}/${this.quoteId}/${this.baseCurrency}`
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

<style lang="scss">
//
</style>
