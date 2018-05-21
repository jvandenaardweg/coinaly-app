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
    <page-footer></page-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavBar from '@/components/NavBar.vue'
import ExchangeStatus from '@/components/ExchangeStatus.vue'
import TabBar from '@/components/TabBar.vue'
import PageFooter from '@/components/PageFooter.vue'

export default {
  name: 'LayoutDashboard',
  components: {
    NavBar,
    ExchangeStatus,
    TabBar,
    PageFooter
  },
  beforeMount () {
    document.querySelector('body').classList.remove('bg-dark-blue')
    if (window.$crisp) {
      window.$crisp.push(['on', 'chat:initiated', this.hideCrispChat])
    }

    // Use before mount for API calls that don't need additional data, like a selected exchange
    this.$store.dispatch('prices/getAllPrices')
    this.$store.dispatch('symbols/getAll')
    this.$store.dispatch('exchanges/getAllExchanges')
    this.$store.dispatch('keys/getAllKeys')

    if (this.selectedExchange) {
      this.loadInitialData()
    }
  },
  computed: {
    ...mapGetters({
      selectedExchange: 'exchanges/selected',
      keys: 'keys/keys'
    })
  },
  methods: {
    hideCrispChat () {
      window.$crisp.push(['do', 'chat:hide'])
    },
    loadInitialData () {
      this.$store.dispatch('markets/loadAll')
      this.$store.dispatch('websockets/connect')
      this.$store.dispatch('websockets/subscribe')
      this.$store.dispatch('websockets/watch')
      this.$store.dispatch('balances/getAll')
    }
  },
  watch: {
    keys (newValue, oldValue) {
      if (!this.selectedExchange) {
        this.$store.commit('exchanges/setSelected', newValue[0].slug)
      }
    },
    selectedExchange (newValue, oldValue) {
      if (oldValue === null && newValue) {
        this.loadInitialData()
      }
    }
  }
}
</script>

<style lang="scss">
#dashboard {
  padding-bottom: 3rem;
}
</style>
