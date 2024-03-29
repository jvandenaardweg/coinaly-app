<template>
  <div class="market-item">
    <div class="market-item-symbol">
      <img :src="iconLocation" :alt="base" />
      <strong>{{ market.base }}<span class="font-weight-normal text-muted">/{{ market.quote }}</span>
      <span class="symbol-full text-muted text-truncate">
        {{ currencyName }}
      </span>
      </strong>
    </div>
    <div class="market-item-meta">
      <span v-if="!hideVolume" class="market-item-volume text-muted d-none d-sm-block">
        {{ tickerBaseVolume | toFixed(0) | number }} {{ quote }}
        <span class="text-muted">{{ tickerQuoteVolume | toFixed(0) | number }} {{ base }}</span>
      </span>
      <span class="market-item-price">
        <span class="market-item-ticker">
          {{ tickerLast }}
        </span>
        <span class="text-muted">
          {{ tickerPrice | currency }}
        </span>
      </span>
      <percentage-badge :percentage="tickerPercentage"></percentage-badge>
      <!-- <btn-favorite :active="isFavorite" class="ml-3" @click.native="handleClickFavorite"></btn-favorite> -->
      <icon name="chevron-right"></icon>
    </div>
  </div>
</template>

<script>
import { marketSymbolToQuoteSymbol, marketSymbolToBaseSymbol } from '@/helpers/symbols'
import PercentageBadge from '@/components/PercentageBadge'
import BtnFavorite from '@/components/btn/Favorite'
import Icon from '@/components/Icon'

export default {
  name: 'ListGroupItemMarket',
  props: {
    market: {
      type: Object,
      required: true
    },
    currency: Object,
    ticker: Object,
    favorite: Boolean,
    hideVolume: Boolean,
    price: Object
  },
  components: {
    PercentageBadge,
    BtnFavorite,
    Icon
  },
  methods: {
    marketSymbolToQuoteSymbol,
    marketSymbolToBaseSymbol,
    handleClickFavorite (event) {
      event.preventDefault()
      // eslint-disable-next-line
      console.log('handle click fav')
    }
  },
  computed: {
    isFavorite () {
      return Boolean(this.favorite) || false
    },
    base () {
      return marketSymbolToBaseSymbol(this.market.symbol)
    },
    currencyName () {
      if (this.currency) {
        return this.currency.name
      } else {
        return null
      }
    },
    quote () {
      return marketSymbolToQuoteSymbol(this.market.symbol)
    },
    iconLocation () {
      if (this.currency) {
        return this.currency.icon_uri
      } else {
        return null
      }
    },
    tickerPercentage () {
      return (this.ticker) ? this.ticker.percentage : 0
    },
    tickerLast () {
      if (this.ticker && this.market.quote === 'USDT') {
        return this.$options.filters.toFixed(this.ticker.last, 4) // So we don't end up with super long price lengths, like: 8031.65394578 (for BTC)
      } else {
        return (this.ticker) ? this.ticker.last : '-'
      }
    },
    tickerBaseVolume () {
      return (this.ticker) ? this.ticker.baseVolume : 0
    },
    tickerQuoteVolume () {
      return (this.ticker) ? this.ticker.quoteVolume : 0
    },
    tickerPrice () {
      if (this.ticker) {
        return this.price.USD * this.ticker.last
      } else {
        return (this.ticker) ? 10 : '-'
      }
    }
  }
}
</script>

<style lang="scss">
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
      margin-right: rem-calc(10);
      width: 18px;

      @include media-breakpoint-up(md) {
        margin-right: rem-calc(15);
      }
    }

    strong {
      // margin-left: 0.5rem;
      text-align: left;

      .symbol-full {
        font-weight: normal;
        display: block;
        max-width: 70px;
        // font-size: rem-calc(14);

        // @include media-breakpoint-up(md) {
        //   font-size: rem-calc(16);
        // }
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
    width: 90px;

    span {
      display: block;
    }
  }

  .market-item-ticker {
    font-weight: 600;
  }
}
</style>
