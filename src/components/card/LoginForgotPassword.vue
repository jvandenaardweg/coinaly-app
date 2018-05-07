<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h1 class="h1 text-center mb-3">Reset your password</h1>
      <p class="text-center text-muted lead font-weight-normal">Fear not. We’ll email you instructions to reset your password.</p>
      <hr />

      <form @submit.prevent="handleSubmit" v-if="!success">
        <fieldset :disabled="isLoading">
          <legend class="sr-only">Reset your password</legend>
          <div class="form-group">
            <label class="d-flex">E-mail address</label>
            <input class="form-control form-control-lg" id="inputEmail" :class="{ 'is-invalid': errors.has('email'), 'is-valid': email && !errors.has('email') }" type="email" name="email" autocomplete="email" placeholder="The e-mail address you signed up with" ref="firstInput" v-model="email" v-validate="'required|email'" />
            <div v-show="errors.has('email')" ref="emailError" class="invalid-feedback">
              {{ errors.first('email') }}
            </div>
          </div>
          <div v-if="error" class="alert alert-danger">
            {{ error }}
          </div>
          <button type="submit" class="btn btn-primary btn-lg btn-block" id="buttonReset" v-if="!success" :class="{ 'is-loading': isLoading }">{{ submitLabel }}</button>
        </fieldset>
      </form>

      <div v-if="success" class="alert alert-success">
        {{ success }}
      </div>

      <div class="text-center mt-4" v-if="!success">
        <router-link to="/login" class="ml-auto font-weight-normal text-muted"><u>Return to login</u></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CardLoginForgotPassword',
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      email: (this.$route) ? this.$route.query.prefill : null,
      submitLabel: 'Reset password',
      successMessage: null
    }
  },
  mounted () {
    this.$refs.firstInput.focus()
  },
  computed: {
    ...mapGetters({
      error: 'auth/error',
      success: 'auth/success',
      isLoading: 'auth/isLoading'
    })
  },
  methods: {
    async handleSubmit (event) {
      const result = await this.$validator.validateAll()
      if (result) {
        await this.$store.dispatch('auth/requestResetToken', this.email)
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
