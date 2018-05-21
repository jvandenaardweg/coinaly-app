<template>
  <div class="dropdown">
    <button @click="show = !show" class="btn btn-select btn-dark-blue btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{ switchLabel }}
    </button>
    <div class="dropdown-menu dropdown-menu-right" :class="{'show': show }" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" v-if="userAvailableExchanges" v-for="exchange in userAvailableExchanges" :key="exchange.id" @click.prevent="handleSwitch(exchange.slug)" v-show="selected !== exchange.slug">Switch to: <strong>{{ exchange.name }}</strong></a>
      <div class="dropdown-divider" v-if="userAvailableExchanges.length > 1"></div>
      <router-link to="/settings/exchanges" class="dropdown-item" @click.native="show = false">Exchange settings</router-link>
      <button type="button" class="dropdown-item" @click.prevent="handleClickLogout">Logout</button>
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
      if (!this.isLoading && this.userAvailableExchanges) return this.selectedName
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
  // created () {
  //   this.$store.dispatch('exchanges/getAllExchanges')
  //   this.$store.dispatch('keys/getAllKeys')
  // },
  methods: {
    handleClickLogout (event) {
      this.$store.dispatch('auth/logout')
    },
    async handleSwitch (exchangeSlug) {
      this.isLoading = true
      this.show = false

      // this.$store.commit('markets/addAll', null)
      // this.$store.commit('balances/addAll', null)
      // this.$store.commit('orders/addAllClosed', null)

      await Promise.all([
        this.$store.dispatch('websockets/unsubscribe'),
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
        this.$store.dispatch('websockets/subscribe'),
        this.$store.dispatch('websockets/watch')
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
