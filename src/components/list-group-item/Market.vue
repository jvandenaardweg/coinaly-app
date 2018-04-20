<template>
  <div class="market-item">
    <div class="market-item-symbol">
      <img :src="iconLocation" :alt="baseId" />
      <strong>
        {{ market.symbol }}
        <span class="text-muted text-truncate">
          {{ fullCurrencyName }}
        </span>
      </strong>
    </div>
    <div class="market-item-meta">
      <span v-if="!hideVolume" class="market-item-volume d-none d-sm-block">
        {{ tickerBaseVolume | toFixed(0) | number }} {{ quoteId }}
        <span class="text-muted">{{ tickerQuoteVolume | toFixed(0) | number }} {{ baseId }}</span>
      </span>
      <span class="market-item-price">
        {{ tickerLast }}
        <span class="text-muted">
          -
        </span>
      </span>
      <PercentageBadge :percentage="tickerPercentage"></PercentageBadge>
      <BtnFavorite :active="isFavorite" class="ml-2" @click.native="handleClickFavorite"></BtnFavorite>
    </div>
  </div>
</template>

<script>
import { symbolToName, marketSymbolToQuoteSymbol, marketSymbolToBaseSymbol, symbolIconLocation } from '@/helpers/symbols'
import PercentageBadge from '@/components/PercentageBadge'
import BtnFavorite from '@/components/btn/Favorite'

export default {
  name: 'ListGroupItemMarket',
  props: {
    market: {
      type: Object,
      required: true
    },
    ticker: Object,
    favorite: Boolean,
    hideVolume: Boolean
  },
  components: {
    PercentageBadge,
    BtnFavorite
  },
  methods: {
    symbolToName,
    marketSymbolToQuoteSymbol,
    marketSymbolToBaseSymbol,
    symbolIconLocation,
    handleClickFavorite (event) {
      event.preventDefault()
      console.log('handle click fav')
    }
  },
  computed: {
    isFavorite () {
      return Boolean(this.favorite) || false
    },
    baseId () {
      return marketSymbolToBaseSymbol(this.market.symbol)
    },
    fullCurrencyName () {
      return symbolToName(this.quoteId)
    },
    quoteId () {
      return marketSymbolToQuoteSymbol(this.market.symbol)
    },
    iconLocation () {
      return symbolIconLocation(this.quoteId)
    },
    tickerPercentage () {
      return (this.ticker) ? this.ticker.percentage : 0
    },
    tickerLast () {
      return (this.ticker) ? this.ticker.last : '-'
    },
    tickerBaseVolume () {
      return (this.ticker) ? this.ticker.baseVolume : 0
    },
    tickerQuoteVolume () {
      return (this.ticker) ? this.ticker.quoteVolume : 0
    }
  }
}
</script>

<style lang="scss" scoped>
.market-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.2;

  .market-item-symbol {
    margin-right: auto;
    display: flex;
    align-items: center;

    img {
      margin-right: 0.5rem;
      width: 18px;
    }

    strong {
      margin-left: 0.5rem;
      text-align: left;

      span {
        font-weight: normal;
        display: block;
        max-width: 70px;
        // max-width: 115px;
      }
    }
  }

  .market-item-meta {
    display: flex;
    align-items: center;
  }

  .market-item-volume {
    text-align: right;
    margin-right: 2rem;

    span {
      display: block;
    }
  }

  .market-item-price {
    text-align: right;
    margin-right: 1rem;
    width: 80px;

    span {
      display: block;
    }
  }
}
</style>
