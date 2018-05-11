<template>
  <form @submit="handleSubmit" @change="handleChange" :disabled="disabled" :aria-disabled="disabled">
    <div class="form-group">
      <label for="exchange">Active exchange</label>
      <select class="custom-select" id="exchange" v-model="exchange">
        <option :value="null" disabled>Select an exchange</option>
        <option value="bittrex">Bittrex</option>
        <option value="binance">Binance</option>
      </select>
    </div>
    <hr />

    <h2 class="h4">Exchanges (2)</h2>
    <ul class="list-group list-group-flush mb-5">
      <li class="list-group-item d-flex align-items-center">
        <strong>Bittrex</strong>
        <div class="ml-auto">
          <router-link to="/settings/exchanges/bittrex" class="btn btn-sm btn-primary">Edit</router-link>
          <button type="button" class="btn btn-sm btn-primary btn-danger">&times;</button>
        </div>
      </li>
      <li class="list-group-item d-flex align-items-center">
        <strong>Binance</strong>
        <div class="ml-auto">
          <router-link to="/settings/exchanges/binance" class="btn btn-sm btn-primary">Edit</router-link>
          <button type="button" class="btn btn-sm btn-primary btn-danger">&times;</button>
        </div>
      </li>
    </ul>

    <button type="submit" class="btn btn-success btn-block btn-lg" :disabled="disabled">{{ submitLabel }}</button>

  </form>
</template>

<script>
export default {
  name: 'PageSettingsExchanges',
  data () {
    return {
      exchange: this.$store.getters['exchanges/selected'],
      disabled: false,
      saveSuccess: null,
      fiat: 'usd',
      subNavItems: [
        {
          label: 'Account',
          slug: 'account'
        },
        {
          label: 'Exchanges',
          slug: 'exchanges'
        }
      ]
    }
  },
  computed: {
    submitLabel () {
      if (this.disabled) {
        return 'Saving settings...'
      } else if (this.saveSuccess) {
        return 'Saved settings!'
      } else {
        return 'Save settings'
      }
    }
  },
  methods: {
    handleChange (event) {
      event.preventDefault()
      this.saveSuccess = null
      this.disabled = false
    },
    handleSubmit (event) {
      this.disabled = true
      event.preventDefault()
      if (this.exchange) {
        this.$store.commit('exchanges/setSelected', this.exchange)
        this.$store.dispatch('balances/getAll', { forceRefresh: true })
          .then(response => {
            console.log('done')
            this.saveSuccess = true
          })
          .finally(() => {
            this.disabled = false
          })
      }
    }
  }
}
</script>
