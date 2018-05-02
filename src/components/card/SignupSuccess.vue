<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h1 class="h1 text-center mb-3">Account created! 🎉</h1>
      <p class="text-center text-muted lead font-weight-normal">Great to have you on board. We've send you an e-mail to verify your e-mail address.</p>
      <p class="text-center">But you can already set up your first exchange.</p>
      <router-link to="/onboarding" class="btn btn-primary btn-lg btn-block mt-7">Setup first exchange</router-link>
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
