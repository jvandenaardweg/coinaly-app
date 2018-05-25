<template>
  <div class="balance-item">
    <div class="balance-item-symbol">
      <img :src="iconLocation" :alt="symbolId" />
      <div>
        <strong>{{ symbolId }}</strong>
        <span class="symbol-full text-muted text-truncate">
          {{ balance.total }}
        </span>
      </div>
    </div>
    <div class="balance-item-meta">
      <div class="balance-item-price" :class="{'is-positive': changeIsPositive === true, 'is-negative': changeIsPositive === false }">
        {{ price | currency }}
      </div>
      <div class="progress">
        <div class="progress-bar" role="progressbar" :style="{'width': `${balancePercentage}%`, 'background-color': symbolColor }" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <!-- <progress value="20" max="100"></progress> -->
      <!-- <div>test</div> -->
    </div>
    <percentage-badge :percentage="percentage"></percentage-badge>
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
    balancePercentage: {
      type: Number,
      required: false,
      default: 0
    },
    symbolId: {
      type: String,
      required: true
    },
    symbol: {
      type: Object,
      required: true
    },
    price: {
      type: Number,
      required: false,
      default: 0
    },
    tickerLast: {
      type: Number,
      required: false,
      default: 0
    },
    percentage: {
      type: Number,
      required: false,
      default: 0
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
      if (this.symbol) {
        return this.symbol.icon_uri
      } else {
        return null
      }
    },
    symbolColor () {
      if (this.symbol.color) return this.symbol.color
      return '#999999'
    }
  },
  watch: {
    price (newValue, oldValue) {
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
    // display: flex;
    // align-items: center;
    text-align: right;
    margin-right: 1rem;
    width: 65px;

    @include media-breakpoint-up(md) {
      width: 120px;
    }

    .progress {
      width: 100%;
      margin-top: 5px;
      height: 4px;
      transform: rotate(180deg);
    }
  }

  .balance-item-volume {
    text-align: right;
    margin-right: 2rem;

    span {
      display: block;
    }
  }

  .balance-item-price {
    // text-align: right;
    // margin-right: 1rem;

    transition: color 250ms;
    font-weight: 600;
    margin-top: -3px;

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
