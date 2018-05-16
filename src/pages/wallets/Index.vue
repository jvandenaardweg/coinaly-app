<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-10 col-md-10 col-lg-6 col-xl-6">
        <div class="text-center d-none d-sm-block">
          <h1 class="h2 mb-4">Your exchange wallets</h1>
          <p class="text-muted">You can deposit or withdraw funds from these wallets.</p>
        </div>
        <card-wallets></card-wallets>
      </div>
    </div>
  </div>
</template>

<script>
import CardWallets from '@/components/card/Wallets'

export default {
  name: 'PageWallets',
  components: {
    CardWallets
  }
}
</script>
