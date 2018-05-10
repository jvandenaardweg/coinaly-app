<template>
  <div class="card card-padded shadow-sm">
    <div class="card-body">
      <h1 class="h1 text-center mb-3">Setup your first exchange</h1>
      <p class="text-center text-muted lead font-weight-normal">Your account is now set up. Let's add your first exchange to get started. You can always add more exchanges later.</p>

      <form @submit.prevent="handleSubmit">
        <fieldset :disabled="isLoading">
          <legend class="sr-only">Setup your first exchange</legend>

          <div class="form-group">
            <label>Exchange</label>
            <select class="custom-select custom-select-lg"
              id="exchange"
              :class="{ 'is-invalid': errors.has('exchange'), 'is-valid': exchange && !errors.has('exchange') }"
              name="exchange"
              autocomplete="exchange-name"
              v-model="exchange"
              v-validate="'required'">
              <option :value="null" selected disabled>Select an exchange</option>
              <option v-for="exchange in allActiveExchanges" :value="exchange" :key="exchange.id">{{ exchange.name }}</option>
              <option value="unavailable" disabled>More to come...</option>
            </select>
            <invalid-feedback v-show="errors.has('exchange')" :message="errors.first('exchange')" ref="exchangeError"></invalid-feedback>
          </div>

          <div class="form-group">
            <label>API Key</label>
            <input class="form-control form-control-lg"
              id="inputApiKey"
              :class="{ 'is-invalid': errors.has('apiKey'), 'is-valid': apiKey && !errors.has('apiKey') }"
              type="text"
              name="apiKey"
              autocomplete="api-key"
              v-model="apiKey"
              :placeholder="`Your ${exchangePlaceholder} API key`"
              ref="firstInput"
              v-validate="'required'"
              />
            <invalid-feedback v-show="errors.has('apiKey')" :message="errors.first('apiKey')" ref="apiKeyError"></invalid-feedback>
          </div>

          <div class="form-group">
            <label>API Secret</label>
            <input class="form-control form-control-lg"
              id="inputApiSecret"
              :class="{ 'is-invalid': errors.has('apiSecret'), 'is-valid': apiSecret && !errors.has('apiSecret') }"
              type="text"
              name="apiSecret"
              autocomplete="api-secret"
              v-model="apiSecret"
              :placeholder="`Your ${exchangePlaceholder} API secret`"
              v-validate="'required'"
              />
            <invalid-feedback v-show="errors.has('apiSecret')" :message="errors.first('apiSecret')" ref="apiSecretError"></invalid-feedback>
          </div>

          <button type="button" tabindex="-1" class="btn btn-link btn-block text-center mb-3">Where can I find my API key and secret?</button>

          <div v-if="keysError" class="alert alert-danger">
            {{ keysError }}
          </div>

          <button type="submit" class="btn btn-primary btn-lg btn-block btn-success" :class="{ 'is-loading': isLoading }">Save exchange</button>
        </fieldset>
      </form>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InvalidFeedback from '@/components/form/InvalidFeedback'

export default {
  name: 'CardOnboarding',
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    InvalidFeedback
  },
  data: () => ({
    exchange: null,
    apiKey: null,
    apiSecret: null,
    isLoading: false
  }),
  computed: {
    ...mapGetters({
      keysError: 'keys/error',
      allActiveExchanges: 'exchanges/allActiveExchanges'
    }),
    exchangePlaceholder () {
      return (this.exchange) ? this.exchange.name : 'exchange'
    }
  },
  created () {
    this.$store.dispatch('exchanges/getAllExchanges')
    this.$store.dispatch('websockets/connect')
  },
  methods: {
    async handleSubmit (event) {
      const result = await this.$validator.validateAll()
      if (result) {
        this.isLoading = true

        // Save the API key/secret pair in the database
        await this.$store.dispatch('keys/createKey', {
          apiKey: this.apiKey,
          apiSecret: this.apiSecret,
          exchangeId: this.exchange.id
        })

        if (!this.keysError) {
          this.$store.commit('exchanges/setSelected', this.exchange.slug)

          await this.$store.dispatch('websockets/subscribe') // Subscribes to the selected exchange ticker stream
          await this.$store.dispatch('websockets/watch') // Watch the ticker stream for changes

          this.$router.push('/')
        }
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss">
//
</style>
