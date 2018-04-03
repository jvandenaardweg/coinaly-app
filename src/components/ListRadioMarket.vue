<template>
  <li :class="{'active': baseCurrency === marketSymbolToBaseSymbol(symbol) }" @click="setSelected(symbol)">
    <div class="custom-control custom-radio">
      <img :src="`static/icons/cryptocurrencies/svg/color/${marketSymbolToBaseSymbol(symbol).toLowerCase()}.svg`" width="18" class="mr-1" :alt="marketSymbolToBaseSymbol(symbol)" />
      <input type="radio" :id="`baseCurrency-${marketSymbolToBaseSymbol(symbol)}`" name="baseCurrency" v-model="baseCurrency" :value="marketSymbolToBaseSymbol(symbol)" class="custom-control-input">
      <label class="custom-control-label" :for="`baseCurrency-${marketSymbolToBaseSymbol(symbol)}`"><strong>{{ marketSymbolToBaseSymbol(symbol) }}</strong> <span class="text-muted" v-if="fullCurrencyName(symbol)">({{ fullCurrencyName(symbol) }})</span></label>
    </div>
    <span class="badge badge-primary badge-pill" v-if="meta.smartMarketTrade">Smart Market Trade</span>
    <span class="text-muted">~ {{ maxSellPrice(symbol) | number }} {{ marketSymbolToBaseSymbol(symbol) }}</span>
  </li>
</template>

<script>
export default {
  name: 'RadioMarket',
  props: ['market']
}
</script>
