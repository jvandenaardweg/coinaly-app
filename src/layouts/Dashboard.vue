<template>
  <div id="dashboard">
    <nav-bar></nav-bar>
    <tab-bar></tab-bar>

    <keep-alive>
      <router-view class="view"></router-view>
    </keep-alive>

    <exchange-status></exchange-status>

    <page-footer></page-footer>

    <update-banner></update-banner>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavBar from '@/components/NavBar.vue'
import ExchangeStatus from '@/components/ExchangeStatus.vue'
import TabBar from '@/components/TabBar.vue'
import PageFooter from '@/components/PageFooter.vue'
import UpdateBanner from '@/components/UpdateBanner.vue'

export default {
  name: 'LayoutDashboard',
  components: {
    NavBar,
    ExchangeStatus,
    TabBar,
    PageFooter,
    UpdateBanner
  },
  beforeMount () {
    document.querySelector('body').classList.remove('bg-dark-blue')

    // Hide crisp chat in the dashboard
    if (window.$crisp) {
      window.$crisp.push(['on', 'chat:initiated', this.hideCrispChat])
    }

    // Use before mount for API calls that don't need additional data, like a selected exchange
    if (!this.keys) {
      this.$store.dispatch('prices/getAllPrices')
      this.$store.dispatch('symbols/getAll')
      this.$store.dispatch('exchanges/getAllExchanges')
      this.$store.dispatch('keys/getAllKeys')

      if (this.selectedExchange) {
        this.loadInitialData()
      }
    }

    this.connectWebsocket()
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
      this.$store.dispatch('balances/getAll')
    },
    connectWebsocket () {
      this.$store.dispatch('websocket/connect')
      this.$store.dispatch('websocket/subscribe')
      this.$store.dispatch('websocket/watch')
    }
  },
  watch: {
    keys (newValue, oldValue) {
      // Watch for changes in the keys store
      // When we have keys, and there's no selectedExchange, we just set the selectedExchange to the first
      if (!this.selectedExchange) {
        this.$store.commit('exchanges/setSelected', newValue[0].slug)
      }
    },
    selectedExchange (newValue, oldValue) {
      // If oldValue is null, it means the user has not yet have the selectedExchange in localStorage
      // So when we got a newValue that is set, we can assume the "keys" watcher above has done it's job
      // So we can safely load data that needs to know the exchange, like markets and balances
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
