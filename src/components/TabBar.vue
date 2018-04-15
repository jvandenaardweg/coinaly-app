<template>
  <nav class="nav">
    <router-link class="nav-link" to="/balances">
      <svg class="feather feather-trending-up" width="20" height="20" fill="transparent" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use xlink:href="static/icons/feather-icons/feather-sprite.svg#trending-up"/></svg>
      <span>Balances</span>
    </router-link>
    <router-link class="nav-link" to="/buy">
      <svg class="feather feather-download" width="20" height="20" fill="transparent" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use xlink:href="static/icons/feather-icons/feather-sprite.svg#download"/></svg>
      <span>Buy</span>
    </router-link>
    <router-link class="nav-link" to="/sell">
      <svg class="feather feather-upload" width="20" height="20" fill="transparent" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use xlink:href="static/icons/feather-icons/feather-sprite.svg#upload"/></svg>
      <span>Sell</span>
    </router-link>
    <router-link class="nav-link" to="/markets">
      <svg class="feather feather-shopping-cart" width="20" height="20" fill="transparent" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use xlink:href="static/icons/feather-icons/feather-sprite.svg#shopping-cart"/></svg>
      <span>Markets</span>
    </router-link>
    <router-link class="nav-link" to="/settings">
      <svg class="feather feather-settings" width="20" height="20" fill="transparent" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use xlink:href="static/icons/feather-icons/feather-sprite.svg#settings"/></svg>
      <span>Settings</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style lang="scss" scoped>
@import "../scss/bootstrap/setting";
@import "~bootstrap/scss/mixins/breakpoints";

.nav {
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
  }

  .nav-link {
    font-size: 0.7rem;
    flex: 1 1 0;
    width: 0;
    text-align: center;
    padding-left: 0;
    padding-right: 0;
    color: $gray-600;

    @include media-breakpoint-up(md) {
      font-size: inherit;
      padding: inherit;
    }

    &.active {
      color: $primary;

      svg {
        stroke: $primary;
      }
    }

    svg {
      stroke: $gray-500;
    }

    span {
      display: block;
      text-align: center;

      @include media-breakpoint-up(md) {
        display: inline-block;
      }
    }
  }
}
</style>
