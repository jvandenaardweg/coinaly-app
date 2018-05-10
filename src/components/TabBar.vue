<template>
  <nav class="nav nav-tabs">
    <router-link class="nav-link" to="/balances">
      <Icon name="trending-up"></Icon>
      <span>Balances</span>
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
    <router-link class="nav-link" to="/settings">
      <Icon name="settings"></Icon>
      <span>Settings</span>
    </router-link>
  </nav>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  name: 'TabBar',
  components: {
    Icon
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
      transition: 150ms all;
      border: 0;
      border-radius: 0;

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
        font-weight: 600;
      }

      &:hover {
        border-right-color: $gray-300;
        @include media-breakpoint-up(md) {
          color: $gray-700;
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
      }

      svg {
        stroke: $gray-500;
        position: relative;
        top: 3px;

        @include media-breakpoint-up(md) {
          margin-right: 0.4rem;
        }
      }

      span {
        display: block;
        text-align: center;
        bottom: -2px;
        position: relative;

        @include media-breakpoint-up(md) {
          display: inline-block;
          bottom: 1px;
        }
      }
    }

  }
}
</style>
