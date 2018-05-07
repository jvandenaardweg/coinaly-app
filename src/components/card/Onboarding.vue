<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h1 class="h1 text-center mb-3">Setup your first exchange</h1>
      <p class="text-center text-muted lead font-weight-normal">Your account is now set up. Let's add your first exchange to get started. You can always add more exchanges later.</p>

      <form @submit.prevent="handleSubmit">
        <fieldset :disabled="isLoading">
          <legend class="sr-only">Setup your first exchange</legend>

          <div class="form-group">
            <label>Exchange</label>
            <select class="form-control form-control-lg"
              id="exchange"
              :class="{ 'is-invalid': errors.has('exchangeId'), 'is-valid': exchangeId && !errors.has('exchangeId') }"
              name="exchange"
              autocomplete="exchange-name"
              v-model="exchangeId"
              v-validate="'required'">
              <option :value="null" selected disabled>Select an exchange</option>
              <option v-for="exchange in allExchanges" :value="exchange.id" :key="exchange.id">{{ exchange.name }}</option>
              <option value="unavailable" disabled>More to come...</option>
            </select>
            <invalid-feedback v-show="errors.has('exchangeId')" :message="errors.first('exchangeId')" ref="exchangeIdError"></invalid-feedback>
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

          <button type="button" class="btn btn-link btn-block text-center mb-3">Where can I find my API key and secret?</button>

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
    exchangeId: null,
    apiKey: null,
    apiSecret: null,
    isLoading: false
  }),
  computed: {
    ...mapGetters({
      keysError: 'keys/error',
      allExchanges: 'exchanges/allExchanges' // TODO: get only active exchanges
    }),
    exchangePlaceholder () {
      // return (this.exchange) ? this.exchange : 'exchange'
      return 'exchange'
    }
  },
  created () {
    this.$store.dispatch('exchanges/getAllExchanges')
    this.$store.dispatch('websockets/connect')
  },
  methods: {
    async handleSubmit (event) {
      this.isLoading = true
      const result = await this.$validator.validateAll()
      if (result) {
        // Save the API key/secret pair in the database
        await this.$store.dispatch('keys/createKey', {
          apiKey: this.apiKey,
          apiSecret: this.apiSecret,
          exchangeId: this.exchangeId
        })

        if (!this.keysError) {
          this.$store.commit('exchanges/setSelected', 'bittrex') // TODO: make dynamic

          await this.$store.dispatch('websockets/subscribe') // Subscribes to the selected exchange ticker stream
          await this.$store.dispatch('websockets/watch')
          // TODO:
          // 1. Save api key and secret (endpoint checks if key/secret pair is valid)
          // 2. Set selected exchange to `this.exchange`
          // 3. Start the websocket
          // 4. Show the user's homepage
          console.log('can now show homepage')
        }
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  border: 0;

  @include media-breakpoint-up(sm) {
    margin-top: 1.5rem;
  }

  .card-body {
    @include media-breakpoint-up(sm) {
      padding: 3rem;
    }
  }
}
</style>
