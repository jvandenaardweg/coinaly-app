<template>
  <div id="dashboard">
    <NavBar></NavBar>
    <TabBar></TabBar>
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
  name: 'LayoutDashboard',
  components: {
    NavBar,
    Sidebar,
    ExchangeStatus,
    TabBar
  },
  created () {
    // this.$store.commit('exchanges/setSelected', 'bittrex')
    this.$store.dispatch('markets/loadAll')
    this.$store.dispatch('currencies/getAll')

    this.$store.dispatch('websockets/connect')
    this.$store.dispatch('websockets/subscribe')
    this.$store.dispatch('websockets/watch')
    this.$store.dispatch('balances/getAll')
  }
}
</script>

<style lang="scss">
//
</style>
