<template>
  <form @submit="handleSubmit" @change="handleChange" :disabled="disabled" :aria-disabled="disabled">
    <div class="form-group">
      <label for="email">E-mail address</label>
      <input type="email" class="form-control" id="email" placeholder="Your e-mail address">
    </div>
    <div class="form-group">
      <label for="password" class="d-flex">New password <button type="button" class="btn btn-sm btn-outline-secondary ml-auto">View</button></label>
      <input type="password" class="form-control" id="password" placeholder="Your new password">
    </div>

    <hr />

    <div class="form-group">
      <label for="fiat">Preferred fiat currency</label>
      <select class="custom-select" id="fiat" v-model="fiat">
        <option :value="'usd'" selected>USD (US Dollar)</option>
        <option :value="'eur'">EUR (Euro)</option>
      </select>
    </div>

    <button type="submit" class="btn btn-success btn-block btn-lg" :disabled="disabled">{{ submitLabel }}</button>

  </form>
</template>

<script>
export default {
  name: 'PageSettingsAccount',
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
