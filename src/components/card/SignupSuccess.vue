<template>
  <div class="card shadow-sm">
    <div class="card-body text-center">
      <h1 class="h1 mb-3">Account created! 🎉</h1>
      <p class="text-muted lead font-weight-normal">Great to have you on board.</p>
      <p class="mt-5 mb-0">Please check your e-mail inbox to verify your account.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardSignupSuccess'
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
