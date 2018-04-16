<template>
  <div class="card">

    <CardLoading :is-loading="isLoadingMarkets" :text="'Loading Markets...'"></CardLoading>

    <CardEmpty
      :is-empty="!isLoadingMarkets && !hasMarkets"
      :text="'No markets available.'">
    </CardEmpty>

    <div class="card-header" v-if="hasMarkets">
      <SubNav :items="subNavItems" :selected="'all'"></SubNav>
    </div>


    <ul class="list-group list-group-flush">
      <li v-if="isWithinPageLimit(index)" v-for="(meta, symbol, index) in allMarkets" :key="symbol" :index="index" class="list-group-item d-flex justify-content-between align-items-center">
        <div class="mr-auto d-flex align-items-center">
          <img :src="symbolIconLocation(marketSymbolToBaseSymbol(symbol))" :id="`list-group-item-icon-${marketSymbolToBaseSymbol(symbol)}`" width="18" class="mr-1" :alt="marketSymbolToBaseSymbol(symbol)" />
          <strong class="ml-2 text-left">
            {{ symbol }}
            <span class="font-weight-normal text-muted d-block">{{ symbolToName(marketSymbolToQuoteSymbol(symbol)) }}</span>
          </strong>
        </div>

        <!-- <span>
          <img :src="symbolIconLocation(marketSymbolToQuoteSymbol(symbol))" :id="`list-group-item-icon-${marketSymbolToQuoteSymbol(symbol)}`" width="18" class="mr-1" :alt="marketSymbolToQuoteSymbol(symbol)" />
          {{ marketSymbolToQuoteSymbol(symbol) }}
          </span> -->
        <div class="d-flex align-items-center">
          <span class="text-right mr-5">
            {{ meta.baseVolume | toFixed(2) | number }} {{ marketSymbolToQuoteSymbol(symbol) }}
            <span class="font-weight-normal d-block text-muted">{{ meta.quoteVolume | toFixed(2) | number }} {{ marketSymbolToBaseSymbol(symbol) }}</span>
          </span>
          <span class="text-right mr-5">
            {{ meta.last }}
            <span class="font-weight-normal d-block text-muted">$ 12.00</span>
          </span>
          <span class="badge" :class=" {'badge-success': meta.percentage >= 0, 'badge-danger': meta.percentage < 0 }">{{ meta.percentage | percentage }}</span>
        </div>

      </li>
    </ul>

    <div class="card-footer" v-if="hasMarkets">
      <button type="button" class="btn btn-outline-primary btn-block btn-lg" @click.prevent="handleShowAllMarkets">Show all markets</button>
    </div>

  </div>
</template>

<script>
import { symbolToName, marketSymbolToQuoteSymbol, marketSymbolToBaseSymbol, symbolIconLocation } from '@/helpers/symbols'
import { mapGetters } from 'vuex'
import CardLoading from '@/components/card/CardPartialLoading'
import CardEmpty from '@/components/card/CardPartialEmpty'
import SubNav from '@/components/SubNav'

export default {
  name: 'CardMarkets',
  components: {
    CardLoading,
    CardEmpty,
    SubNav
  },
  data () {
    return {
      marketIndex: null,
      paginationLimit: 20,
      subNavItems: [
        { label: 'All', slug: 'all', uri: '/markets/all' },
        { label: 'BTC', slug: 'btc', uri: '/markets/BTC' },
        { label: 'ETH', slug: 'eth', uri: '/markets/ETH' },
        { label: 'USDT', slug: 'usdt', uri: '/markets/USDT' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      isLoadingMarkets: 'markets/isLoading',
      hasMarkets: 'markets/hasMarkets',
      allMarkets: 'markets/allMarkets'
    })
  },
  methods: {
    symbolToName,
    marketSymbolToQuoteSymbol,
    marketSymbolToBaseSymbol,
    symbolIconLocation,
    isWithinPageLimit (index) {
      this.marketsIndex = index
      if (index < this.paginationLimit) {
        return true
      } else {
        return false
      }
    },
    handleShowAllMarkets () {
      this.paginationLimit = 9999
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/bootstrap/setting";
@import "~bootstrap/scss/mixins/breakpoints";

.list-group-item,
label {
  cursor: pointer;
}

.card-footer {
  @include media-breakpoint-only(xs) {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    position: fixed;
    background: none;
    left: 0;
    width: 100%;
    bottom: 0;
    border: 0;
  }
}
</style>
