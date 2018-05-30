<template>
  <nav class="nav nav-tabs">
    <router-link class="nav-link" to="/balances">
      <Icon name="trending-up"></Icon>
      <span>Balances</span>
    </router-link>
    <router-link class="nav-link" to="/orders">
      <Icon name="package"></Icon>
      <span>Orders <span v-if="totalOpenOrders">{{ totalOpenOrders }}</span></span>
    </router-link>
    <router-link class="nav-link" to="/buy">
      <Icon name="download"></Icon>
      <span>Buy</span>
    </router-link>
    <router-link class="nav-link" to="/sell">
      <Icon name="upload"></Icon>
      <span>Sell</span>
    </router-link>
    <router-link class="nav-link" to="/markets">
      <Icon name="shopping-cart"></Icon>
      <span>Markets</span>
    </router-link>
    <router-link class="nav-link" to="/wallets">
      <Icon name="archive"></Icon>
      <span>Wallets</span>
    </router-link>
  </nav>
</template>

<script>
import Icon from '@/components/Icon'
import { mapGetters } from 'vuex'
export default {
  name: 'TabBar',
  components: {
    Icon
  },
  computed: {
    ...mapGetters({
      totalOpenOrders: 'orders/totalOpenOrders'
    })
  }
}
</script>

<style lang="scss">
.nav {
  &.nav-tabs {
    background-color: $white;
    border-top: 1px $border-color solid;
    padding: 0;
    text-align: center;
    position: fixed;
    width: 100%;
    z-index: 100;
    height: 3.5rem;
    bottom: 0;
    justify-content: space-around;
    border-bottom: 0;

    @include media-breakpoint-up(md) {
      top: 3.75rem;
      bottom: auto;
      border-bottom: 1px $border-color solid;
      border-top: 0;
      justify-content: center;
    }

    .nav-link {
      font-size: 0.7rem;
      flex: 1 1 0;
      width: 0;
      text-align: center;
      padding-left: 0;
      padding-right: 0;
      color: $gray-500;
      transition: 150ms color;
      border: 0;
      border-radius: 0;
      font-weight: 600;

      @include media-breakpoint-up(md) {
        font-size: inherit;
        padding: inherit;
        align-self: center;
        flex: inherit;
        width: auto;
        display: inline-block;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        border-right: 1px $gray-300 solid;
      }

      &:hover {
        border-right-color: $gray-300;
        @include media-breakpoint-up(md) {
          color: $gray-700;
        }

        span {
          > span {
            background-color: $gray-700;
          }
        }
      }

      &:last-child {
        border-right: 0;
      }

      &.active {
        color: $primary;
        background: transparent;

        svg {
          stroke: $primary;
        }

        span {
          > span {
            background-color: $primary;
          }
        }
      }

      svg {
        stroke: $gray-500;
        position: relative;
        top: 3px;

        @include media-breakpoint-up(md) {
          margin-right: 0.4rem;
        }
      }

      > span {
        display: block;
        text-align: center;
        bottom: -2px;
        position: relative;

        @include media-breakpoint-up(md) {
          display: inline-block;
          bottom: 1px;
        }

        span {
          width: 18px;
          height: 18px;
          border-radius: 18px;
          text-align: center;
          background-color: $gray-500;
          color: $white;
          position: absolute;
          top: -25px;
          right: -28px;
          display: inline-block;
          left: 0;
          margin: auto;
          transition: 150ms background-color;

          @include media-breakpoint-up(md) {
            top: -2px;
            right: auto;
            margin-left: 2px;
            font-size: 0.7rem;
            position: relative;
          }
        }
      }
    }

  }
}
</style>
