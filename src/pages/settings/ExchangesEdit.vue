<template>
  <form @submit="handleSubmit" @change="handleChange" :disabled="disabled" :aria-disabled="disabled">
    <p>edit exchange</p>


    <button type="submit" class="btn btn-success btn-block btn-lg" :disabled="disabled">{{ submitLabel }}</button>

  </form>
</template>

<script>
export default {
  name: 'PageSettingsExchangesEdit',
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
