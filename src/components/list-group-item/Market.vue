<template>
<div class="list-group-item-market d-flex justify-content-between align-items-center">
  <div class="mr-auto d-flex align-items-center">
    <img :src="symbolIconLocation(marketSymbolToBaseSymbol(market.symbol))" :id="`list-group-item-icon-${marketSymbolToBaseSymbol(market.symbol)}`" width="18" class="mr-1" :alt="marketSymbolToBaseSymbol(market.symbol)" />
    <strong class="ml-2 text-left">
      {{ market.symbol }}
      <span class="font-weight-normal text-muted d-block text-truncate" style="max-width: 115px;">{{ symbolToName(marketSymbolToQuoteSymbol(market.symbol)) }}</span>
    </strong>
  </div>
  <div class="d-flex align-items-center">
    <span v-if="!hideVolume" class="text-right mr-5 d-none d-sm-block">
      {{ market.baseVolume || 0 | toFixed(2) | number }} {{ marketSymbolToQuoteSymbol(market.symbol) }}
      <span class="font-weight-normal d-block text-muted">{{ market.quoteVolume || 0 | toFixed(2) | number }} {{ marketSymbolToBaseSymbol(market.symbol) }}</span>
    </span>
    <span class="text-right mr-5" style="width: 80px">
      {{ market.last || '-' }}
      <span class="font-weight-normal d-block text-muted">$ 12.00</span>
    </span>

    <div>
      <PercentageBadge :percentage="market.percentage"></PercentageBadge>
    </div>

    <div class="ml-2">
      <Icon name="star" stroke="#ccc" fill="#ccc"></Icon>
    </div>
  </div>
</div>
</template>

<script>
import { symbolToName, marketSymbolToQuoteSymbol, marketSymbolToBaseSymbol, symbolIconLocation } from '@/helpers/symbols'
import Icon from '@/components/Icon'
import PercentageBadge from '@/components/PercentageBadge'

export default {
  name: 'ListGroupItemMarket',
  props: ['market', 'hideVolume'],
  components: {
    Icon,
    PercentageBadge
  },
  methods: {
    symbolToName,
    marketSymbolToQuoteSymbol,
    marketSymbolToBaseSymbol,
    symbolIconLocation
  }
}
</script>
