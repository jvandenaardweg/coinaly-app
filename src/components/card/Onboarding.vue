<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h1 class="h1 text-center mb-3">Setup your first exchange</h1>
      <p class="text-center text-muted lead font-weight-normal">Your account is now set up. Let's add your first exchange to get started. You can always add more exchanges later.</p>

      <form>
        <div class="form-group">
          <label>Exchange</label>
          <select class="form-control form-control-lg" v-model="exchange" required>
            <option :value="null" selected disabled>Select an exchange</option>
            <option value="bittrex">Bittrex</option>
            <option value="binance">Binance</option>
            <option value="poloniex">Poloniex</option>
          </select>
        </div>
        <div class="form-group">
          <label>API Key</label>
          <input class="form-control form-control-lg" type="text" :placeholder="`Your ${exchangePlaceholder} API key`" required />
        </div>
        <div class="form-group">
          <label>API Secret</label>
          <input class="form-control form-control-lg" type="text" :placeholder="`Your ${exchangePlaceholder} API secret`" required />
        </div>
        <button type="button" class="btn btn-link btn-block text-center mb-3">Where can I find my API key and secret?</button>
        <!-- <div class="alert alert-info">
          [show gif]
        </div> -->
        <button type="button" class="btn btn-primary btn-lg btn-block btn-success">Save exchange</button>
      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'CardOnboarding',
  data () {
    return {
      exchange: null
    }
  },
  computed: {
    exchangePlaceholder () {
      return (this.exchange) ? this.exchange : 'exchange'
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
