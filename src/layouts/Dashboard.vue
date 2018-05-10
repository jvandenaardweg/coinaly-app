<template>
  <div id="dashboard">
    <nav-bar></nav-bar>
    <tab-bar></tab-bar>
    <!-- <div class="page"> -->
      <!-- <div class="page-main"> -->
        <!-- <div class="page-content"> -->
          <!-- <div class="container"> -->
            <!-- <transition name="fade" mode="out-in"> -->
              <keep-alive>
                <router-view class="view"></router-view>
              </keep-alive>
            <!-- </transition> -->
            <exchange-status></exchange-status>
          <!-- </div> -->
        <!-- </div> -->
      <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import ExchangeStatus from '@/components/ExchangeStatus.vue'
import TabBar from '@/components/TabBar.vue'

export default {
  name: 'LayoutDashboard',
  components: {
    NavBar,
    ExchangeStatus,
    TabBar
  },
  mounted () {
    document.querySelector('body').classList.remove('bg-dark-blue')
  },
  beforeMount () {
    // this.$store.commit('exchanges/setSelected', 'bittrex')
    this.$store.dispatch('markets/loadAll')
    this.$store.dispatch('currencies/getAll')

    this.$store.dispatch('websockets/connect')
    this.$store.dispatch('websockets/subscribe')
    this.$store.dispatch('websockets/watch')
    this.$store.dispatch('balances/getAll')
    this.$store.dispatch('prices/getAllPrices')
  }
}
</script>

<style lang="scss">
//
</style>
