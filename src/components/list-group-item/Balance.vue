<template>
  <div class="balance-item">
    <div class="balance-item-symbol">
      <img :src="iconLocation" :alt="symbol" />
      <div>
        <strong>{{ symbol }}</strong>
        <span class="symbol-full text-muted text-truncate">
          {{ balance.total }}
        </span>
      </div>
    </div>
    <div class="balance-item-meta">
      <span class="balance-item-price" :class="{'is-positive': changeIsPositive === true, 'is-negative': changeIsPositive === false }">
        {{ totalPriceUSD | currency }}
      </span>
      <percentage-badge :percentage="percentage"></percentage-badge>
    </div>
    <icon name="chevron-right"></icon>
  </div>
</template>

<script>
import PercentageBadge from '@/components/PercentageBadge'
import BtnFavorite from '@/components/btn/Favorite'
import Icon from '@/components/Icon'

export default {
  name: 'ListGroupItemBalance',
  props: {
    balance: {
      type: Object,
      required: true
    },
    symbol: {
      type: String,
      required: true
    },
    currency: {
      type: Object,
      required: true
    },
    price: {
      type: Object,
      required: false
    },
    tickerLast: {
      type: Number,
      required: false
    },
    tickerQuote: {
      type: String,
      required: false
    },
    percentage: {
      type: Number,
      required: false
    }
  },
  components: {
    PercentageBadge,
    BtnFavorite,
    Icon
  },
  data: () => ({
    changeIsPositive: null
  }),
  computed: {
    iconLocation () {
      if (this.currency) {
        return this.currency.icon_uri
      } else {
        return null
      }
    },
    totalPriceUSD () {
      if (this.price) return (this.balance.total * this.tickerLast) * this.price.USD
      return 0
    }
  },
  watch: {
    totalPriceUSD (newValue, oldValue) {
      // if (newValue < oldValue) console.log('down')
      // if (newValue > oldValue) console.log('up')
      // if (newValue === oldValue) console.log('neutral')
      if (oldValue !== null) {
        if (newValue >= oldValue) {
          this.changeIsPositive = true
          setTimeout(() => {
            this.changeIsPositive = null
          }, 1500)
        } else if (newValue < oldValue) {
          this.changeIsPositive = false
          setTimeout(() => {
            this.changeIsPositive = null
          }, 1500)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.balance-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.2;

  .balance-item-symbol {
    margin-right: auto;
    display: flex;
    align-items: center;

    img {
      margin-right: 0.5rem;
      width: 18px;
    }

    > div {
      margin-left: 0.5rem;
    }

    strong {
      text-align: left;
      display: block;
    }

    .symbol-full {
        font-weight: normal;
        display: block;
        max-width: 120px;
        // max-width: 115px;
      }
  }

  .balance-item-meta {
    display: flex;
    align-items: center;
  }

  .balance-item-volume {
    text-align: right;
    margin-right: 2rem;

    span {
      display: block;
    }
  }

  .balance-item-price {
    text-align: right;
    margin-right: 1rem;
    width: 90px;
    transition: all 250ms;

    &.is-negative {
      color: $danger;
    }

    &.is-positive {
      color: $success;
    }

    span {
      display: block;
    }
  }
}
</style>
