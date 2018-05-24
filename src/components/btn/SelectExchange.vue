<template>
  <div class="dropdown" v-click-outside="handleClickOutside">
    <button @click.prevent="handleClickDropdownButton" class="btn btn-select btn-dark-blue btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{ switchLabel }}
    </button>
    <div class="dropdown-menu dropdown-menu-right" :class="{'show': show }" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item dropdown-item-exchange" v-if="userAvailableExchanges" v-for="exchange in userAvailableExchanges" :key="exchange.id" @click.prevent="handleSwitch(exchange.slug)" v-show="selected !== exchange.slug">Switch to: <strong>{{ exchange.name }}</strong></a>
      <div class="dropdown-divider" v-if="userAvailableExchanges.length > 1"></div>
      <router-link to="/settings/exchanges" class="dropdown-item" @click.native="show = false" id="buttonExchangeSettings">Exchange settings</router-link>
      <button type="button" class="dropdown-item" @click.prevent="handleClickReload" id="buttonReload">Reload</button>
      <button type="button" class="dropdown-item" @click.prevent="handleClickLogout" id="buttonLogout">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BtnSelectExchange',
  data () {
    return {
      show: false,
      isLoading: null
    }
  },
  computed: {
    ...mapGetters({
      selected: 'exchanges/selected',
      selectedName: 'exchanges/selectedName',
      activeExchanges: 'exchanges/allActiveExchanges',
      keys: 'keys/keys'
    }),
    switchLabel () {
      if (this.isLoading) return 'Switching...'
      if (!this.isLoading && this.userAvailableExchanges && this.selectedName) return this.selectedName
      return 'Select exchange'
    },
    userAvailableExchanges () {
      if (this.activeExchanges && this.keys) {
        return this.activeExchanges.reduce((obj, exchange) => {
          this.keys.map((key, index) => {
            if (key.exchange_id === exchange.id) {
              obj.push(exchange)
            }
          })
          return obj
        }, [])
      } else {
        return []
      }
    }
  },
  methods: {
    handleClickDropdownButton (event) {
      this.show = !this.show
    },
    handleClickOutside (event) {
      this.show = false
    },
    handleClickReload (event) {
      window.location.reload(true)
    },
    handleClickLogout (event) {
      this.$store.dispatch('auth/logout')
    },
    async handleSwitch (exchangeSlug) {
      this.isLoading = true
      this.show = false

      await this.loadAllData(exchangeSlug)
    },
    async loadAllData (exchangeSlug) {
      await Promise.all([
        this.$store.dispatch('websocket/unsubscribe'),
        this.$store.commit('exchanges/setSelected', exchangeSlug),
        this.$store.commit('deposits/resetState'),
        this.$store.commit('balances/resetState'),
        this.$store.commit('markets/resetState'),
        this.$store.commit('orders/resetState'),
        this.$store.commit('tickers/resetState'),
        this.$store.dispatch('markets/loadAll'),
        this.$store.dispatch('balances/getAll'),
        this.$store.dispatch('exchanges/getAllExchanges'),
        this.$store.dispatch('orders/getAllClosedOrders', exchangeSlug),
        this.$store.dispatch('websocket/subscribe'),
        this.$store.dispatch('websocket/watch')
      ])

      this.isLoading = false
    }
  }
}
</script>

<style lang="scss">
.btn-select {
  outline: none;
  height: 34px;
}

.dropdown-item {
  cursor: pointer;
}
</style>
