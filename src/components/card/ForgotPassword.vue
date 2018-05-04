<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h1 class="h1 text-center mb-3">Reset your password</h1>
      <p class="text-center text-muted lead font-weight-normal">Fear not. We’ll email you instructions to reset your password.</p>
      <hr />

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>E-mail address</label>
          <input class="form-control form-control-lg" type="email" autocomplete="email" placeholder="The e-mail address you signed up with" ref="firstInput" v-model="email" required />
        </div>

        <div v-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <button type="submit" class="btn btn-primary btn-lg btn-block">{{ submitLabel }}</button>

      </form>

      <div class="text-center mt-4">
        <router-link to="/login" class="ml-auto font-weight-normal text-muted"><u>Return to login</u></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardForgotPassword',
  data () {
    return {
      email: this.$route.query.prefill || null,
      submitLabel: 'Reset password',
      error: null
    }
  },
  mounted () {
    this.$refs.firstInput.focus()
  },
  computed: {
    handleSubmit (event) {
      console.log('reset password', this.email)
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
