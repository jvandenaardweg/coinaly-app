<template>
  <div class="balances-summary">
    <div class="balances-summary-body">
      <h1 class="h1">{{ totalPrice }}</h1>
      <h2 class="h5" v-html="totalBTCPrice"></h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BalancesSummary',
  computed: {
    ...mapGetters({
      balancesError: 'balances/error',
      totalBalancesPrices: 'balances/totalBalancesPrices',
      getPriceBySymbol: 'prices/getPriceBySymbol',
      isLoadingPrices: 'prices/isLoading'
    }),
    totalPrice () {
      if (this.balancesError) return 'Error'
      if (this.totalBalancesPrices) return this.$options.filters.currency(this.totalBalancesPrices)
      return 'Loading...'
    },
    totalBTCPrice () {
      if (this.balancesError) return this.balancesError
      if (this.totalBalancesPrices && !this.isLoadingPrices) {
        return this.$options.filters.toFixed(this.totalBalancesPrices / this.getPriceBySymbol('BTC').USD) + ' BTC'
      } else {
        return '&nbsp;' // So an empty price (loading) won't make the layout move
      }
    }
  }
}
</script>

<style lang="scss">
.balances-summary {
  background-color: $blue;
  border-radius: $border-radius;
  color: $white;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  @include media-breakpoint-only(xs) {
    margin-left: -0.75rem;
    margin-right: -0.75rem;
    border-radius: 0;
    border-left: 0;
    border-right: 0;
  }

  .balances-summary-body {
    text-align: center;
    padding: 2rem 3rem;

    @include media-breakpoint-up(md) {
      padding: 3rem;
    }

    h1 {
      margin-bottom: 0.3rem;
      font-weight: bold;
    }

    h2 {
      opacity: 0.5;
      font-weight: normal;
      margin-bottom: 0;
    }
  }
}
</style>
