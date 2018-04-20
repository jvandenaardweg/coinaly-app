<template>
  <div id="app">
    <NavBar></NavBar>

    <TabBar></TabBar>
    <!-- <Sidebar></Sidebar> -->
    <div class="page">
      <div class="page-main">
        <div class="page-content">
          <div class="container">
            <!-- <transition name="fade" mode="out-in"> -->
              <!-- <keep-alive> -->
                <router-view class="view"></router-view>
              <!-- </keep-alive> -->
            <!-- </transition> -->
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
    // this.$store.commit('exchanges/setSelected', 'bittrex')
    this.$store.dispatch('markets/loadAll')

    this.$store.dispatch('websockets/connect')
    this.$store.dispatch('websockets/subscribe')
    this.$store.dispatch('websockets/watch')
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
@import "./scss/bootstrap/components/list-group";

#app {
  padding-bottom: 5rem;
}

.page {
  padding-top: 5rem;

  @include media-breakpoint-up(sm) {
    padding-top: 5rem;
  }

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

.btn,
label {
  font-weight: 600;
}

label {
  margin-bottom: 0.3rem;
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

.view {
  // max-width: 800px;
  // margin: 0 auto;
  position: relative;
}
.fade-enter-active, .fade-leave-active {
  transition: all 100ms ease
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}

</style>
