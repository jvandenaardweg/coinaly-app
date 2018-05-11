<template>
  <div class="balances-summary">
    <div class="balances-summary-body">
      <h1 class="h1">&euro; 12.035,51</h1>
      <h2 class="h5">2.41231 BTC</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BalancesSummary'
}
</script>

<style lang="scss">
.balances-summary {
  background-color: $blue;
  border-radius: $border-radius;
  color: $white;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  @include media-breakpoint-only(xs) {
    margin-left: -0.75rem;
    margin-right: -0.75rem;
    border-radius: 0;
    border-left: 0;
    border-right: 0;
  }

  .balances-summary-body {
    text-align: center;
    padding: 2rem 3rem;

    @include media-breakpoint-up(md) {
      padding: 3rem;
    }

    h1 {
      margin-bottom: 0.5rem;
      font-weight: bold;
    }

    h2 {
      opacity: 0.5;
      font-weight: normal;
      margin-bottom: 0;
    }
  }
}
</style>
