<template>
  <div class="dropdown">
    <button @click="show = !show" class="btn btn-dark-blue btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{ switchStatus }}
    </button>
    <div class="dropdown-menu dropdown-menu-right" :class="{'show': show }" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" @click.prevent="handleSwitch('binance')" v-show="selected !== 'binance'">Switch to: <strong>Binance</strong></a>
      <a class="dropdown-item" @click.prevent="handleSwitch('bittrex')" v-show="selected !== 'bittrex'">Switch to: <strong>Bittrex</strong></a>
      <a class="dropdown-item" @click.prevent="handleSwitch('poloniex')" v-show="selected !== 'poloniex'">Switch to: <strong>Poloniex</strong></a>
      <div class="dropdown-divider"></div>
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
      selectedName: 'exchanges/selectedName'
    }),
    switchStatus () {
      if (this.isLoading) return 'Switching...'
      return this.selectedName
    }
  },
  methods: {
    handleClickLogout (event) {
      this.$store.dispatch('auth/logout')
      window.location.reload()
    },
    async handleSwitch (exchangeSlug) {
      this.isLoading = true
      this.show = false

      await Promise.all([
        this.$store.dispatch('websockets/unsubscribe'),
        this.$store.commit('exchanges/setSelected', exchangeSlug),
        this.$store.dispatch('markets/loadAll'),
        this.$store.dispatch('balances/getAll'),
        this.$store.dispatch('websockets/subscribe'),
        this.$store.dispatch('websockets/watch')
      ])

      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  // background: #22467B;
  // border-color: #22467B;
  outline: none;
}

.dropdown-item {
  cursor: pointer;
}
</style>
