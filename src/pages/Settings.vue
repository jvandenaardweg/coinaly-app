<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5">
        <div class="card">
          <div class="card-header">
            <SubNav :items="subNavItems" :selected="'account'"></SubNav>
          </div>
          <div class="card-body">
            <form @submit="handleSubmit" @change="handleChange" :disabled="disabled" :aria-disabled="disabled">
              <div class="form-group">
                <label for="email">E-mail address</label>
                <input type="email" class="form-control" id="email" placeholder="Your e-mail address">
              </div>
              <div class="form-group">
                <label for="fiat">Preferred fiat currency</label>
                <select class="custom-select" id="fiat" v-model="fiat">
                  <option :value="'usd'" selected>USD (US Dollar)</option>
                  <option :value="'eur'">EUR (Euro)</option>
                </select>
              </div>
              <!-- <hr /> -->
              <!-- <div class="form-group">
                <label for="exchange">Active exchange</label>
                <select class="custom-select" id="exchange" v-model="exchange">
                  <option :value="null" disabled>Select an exchange</option>
                  <option value="bittrex">Bittrex</option>
                  <option value="binance">Binance</option>
                </select>
              </div>
              <hr />
              <div class="form-group">
                <label for="api-key">API Key</label>
                <input type="text" class="form-control" id="api-key" placeholder="[exchange] API Key">
              </div>
              <div class="form-group">
                <label for="api-secret">API Secret</label>
                <input type="text" class="form-control" id="api-secret" placeholder="[exchange] API Secret">
              </div> -->


              <!-- <hr />
              <h2 class="h4">Exchanges (2)</h2>
              <ul class="list-group list-group-flush mb-5">
                <li class="list-group-item d-flex align-items-center">
                  <strong>Bittrex</strong>
                  <div class="ml-auto"><button type="button" class="btn btn-sm btn-primary">Edit</button></div>
                </li>
                <li class="list-group-item d-flex align-items-center">
                  <strong>Binance</strong>
                  <div class="ml-auto"><button type="button" class="btn btn-sm btn-primary">Edit</button></div>
                </li>
              </ul> -->


              <button type="submit" class="btn btn-success btn-block btn-lg" :disabled="disabled">{{ submitLabel }}</button>

            </form>

          </div>
        </div>
        <button type="submit" class="btn btn-outline-secondary mt-5" :disabled="disabled">Delete account</button>
      </div>
    </div>
  </div>
</template>

<script>
import SubNav from '@/components/SubNav'

export default {
  name: 'PageSettings',
  components: {
    SubNav
  },
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
