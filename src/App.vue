<template>
  <div id="app">
    <NavBar></NavBar>

    <TabBar></TabBar>
    <!-- <Sidebar></Sidebar> -->
    <div class="page">
      <div class="page-main">
        <div class="page-content">
          <div class="container">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
            <ExchangeStatus></ExchangeStatus>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import ExchangeStatus from '@/components/ExchangeStatus.vue'
import TabBar from '@/components/TabBar.vue'

export default {
  name: 'app',
  components: {
    NavBar,
    Sidebar,
    ExchangeStatus,
    TabBar
  },
  created () {
    this.$store.commit('exchanges/setSelected', 'binance')
    this.$store.dispatch('websockets/connect')
    // this.$store.dispatch('websockets/subscribe', 'TICKERS~BITTREX~NEW')
    this.$store.dispatch('balances/getAll')
  }
}
</script>

<style lang="scss">
@import "./scss/bootstrap/setting";
@import "~bootstrap/scss/bootstrap";

// Customizing bootstrap standard components a little bit
@import "./scss/bootstrap/components/dropdown";
@import "./scss/bootstrap/components/card";
@import "./scss/bootstrap/components/select-group";

#app {
  padding-bottom: 5rem;
}

.page {
  padding-top: 5rem;

  @include media-breakpoint-up(md) {
    padding-top: 9rem;
  }
}

html {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  text-size-adjust: 100%;
}

.navbar {
  border-bottom: 1px $border-color solid;
}

.btn {
  font-weight: 600;
}

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

</style>
