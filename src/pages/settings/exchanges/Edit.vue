<template>
  <form @submit.prevent="handleSubmit" v-if="!isInitialLoading">
    <h1 class="h2 text-center">Edit {{ exchangeName }}</h1>

    <fieldset :disabled="isLoading">
      <legend class="sr-only">Change exchange API key and secret</legend>
      <div class="alert alert-info">Because your current {{ exchangeName }}  API key and secret are stored securely, we don't show them here for security reasons. 👍</div>
      <div class="form-group">
        <label class="d-flex">{{ exchangeName }} API Key</label>
        <input
          class="form-control form-control-lg"
          id="inputApiKey"
          :class="{ 'is-invalid': errors.has('apiKey'), 'is-valid': apiKey && !errors.has('apiKey') }"
          type="text"
          name="apiKey"
          :placeholder="`Your ${exchangeName} API key`"
          ref="firstInput"
          v-model="apiKey"
          v-validate="'required'" />
        <invalid-feedback v-show="errors.has('apiKey')" :message="errors.first('apiKey')" ref="apiKeyError"></invalid-feedback>
      </div>

      <div class="form-group">
        <label class="d-flex">{{ exchangeName }} API Secret</label>
        <input
          class="form-control form-control-lg"
          id="inputApiSecret"
          :class="{ 'is-invalid': errors.has('apiSecret'), 'is-valid': apiSecret && !errors.has('apiSecret') }"
          type="text"
          name="apiSecret"
          :placeholder="`Your ${exchangeName} API secret`"
          ref="inputApiSecret"
          v-model="apiSecret"
          v-validate="'required'" />
        <invalid-feedback v-show="errors.has('apiSecret')" :message="errors.first('apiSecret')" ref="apiSecretError"></invalid-feedback>
      </div>

      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div v-if="success" class="alert alert-success">
        {{ success }}
      </div>

      <button type="submit" class="btn btn-lg btn-success btn-block" :class="{'is-loading': isLoading}" id="buttonSave">Save {{ exchangeSlug }} exchange</button>

      <div class="text-center mt-4">
        <router-link to="/settings/exchanges" class="ml-auto font-weight-normal text-muted"><u>Go back to exchanges</u></router-link>
      </div>
    </fieldset>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import InvalidFeedback from '@/components/form/InvalidFeedback'

export default {
  name: 'PageSettingsExchangesEdit',
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    InvalidFeedback
  },
  data: () => ({
    apiKey: null,
    apiSecret: null,
    isLoading: null
  }),
  computed: {
    ...mapGetters({
      error: 'keys/error',
      success: 'keys/success',
      activeExchanges: 'exchanges/allActiveExchanges',
      isLoadingExchanges: 'exchanges/isLoading',
      isLoadingKeys: 'keys/isLoading'
    }),
    isInitialLoading () {
      return this.isLoadingExchanges && this.isLoadingKeys
    },
    selectedExchangeSlug () {
      return (this.$route) ? this.$route.params.exchangeSlug : null
    },
    exchange () {
      if (this.activeExchanges) {
        return this.activeExchanges.filter(exchange => {
          return exchange.slug === this.selectedExchangeSlug
        })[0]
      } else {
        return {}
      }
    },
    exchangeName () {
      return (this.exchange) ? this.exchange.name : null
    },
    exchangeSlug () {
      return (this.exchange) ? this.exchange.slug : null
    }
  },
  methods: {
    async handleSubmit (event) {
      const result = await this.$validator.validateAll()
      if (result) {
        this.isLoading = true

        // Update the API key/secret pair in the database
        await this.dispatchUpdateKey()
      }
      this.isLoading = false
    },
    dispatchUpdateKey () {
      return this.$store.dispatch('keys/updateKey', {
        apiKey: this.apiKey,
        apiSecret: this.apiSecret,
        exchangeId: this.exchange.id
      })
    }
  }
}
</script>
