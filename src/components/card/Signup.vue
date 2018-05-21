<template>
  <div class="card card-padded shadow-sm">
    <div class="card-body">
      <h1 class="h1 text-center mb-3">Get started</h1>
      <p class="text-center text-muted lead font-weight-normal">Create your free Coinaly account to make cryptocurrency trading easier and portfolio insights more helpful.</p>
      <hr />
      <form @submit.prevent="handleSubmit">
        <fieldset :disabled="isDisabled">
          <legend class="sr-only">Signup</legend>

          <div class="form-group">
            <label>E-mail address</label>
            <input
              class="form-control form-control-lg"
              id="inputEmail"
              :class="{ 'is-invalid': errors.has('email'), 'is-valid': fields.email && fields.email.valid && fields.email.validated }"
              type="email"
              name="email"
              autocomplete="email"
              placeholder="Your e-mail address"
              ref="firstInput"
              v-model="email"
              v-validate="'required|email'" />
            <invalid-feedback v-show="errors.has('email')" :message="errors.first('email')" ref="emailError"></invalid-feedback>
          </div>

          <div class="form-group">
            <label>Password</label>
            <div class="input-group mb-3">
              <input
                class="form-control form-control-lg"
                id="inputPassword"
                :class="{ 'is-invalid': errors.has('password'), 'is-valid': fields.password && fields.password.valid && fields.password.validated }"
                type="password"
                name="password"
                autocomplete="current-password"
                placeholder="Your super secret password"
                ref="inputPassword"
                v-model="password"
                v-validate="'required'" />
              <div class="input-group-append">
                <button class="btn btn-outline-primary" type="button" ref="buttonViewPassword" @click.prevent="handleViewPassword">{{ viewPasswordLabel }}</button>
              </div>
              <invalid-feedback v-show="errors.has('password')" :message="errors.first('password')" ref="passwordError"></invalid-feedback>
            </div>

          </div>

          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="inputEmailOptIn" v-model="emailOptIn">
              <label class="custom-control-label font-weight-normal" for="inputEmailOptIn">My e-mail address can be used to send Coinaly product updates about new features</label>
            </div>
          </div>

          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="inputPrivacyTermsOfUse" name="privacyTermsOfUse" data-vv-as="Privacy Policy and Terms of Use" :class="{ 'is-invalid': errors.has('privacyTermsOfUse')}" v-model="privacyTermsOfUse" v-validate="'required'">
              <label class="custom-control-label font-weight-normal" id="labelPrivacyTermsOfUse" for="inputPrivacyTermsOfUse">I agree with the <router-link to="/privacy-policy" id="privacyLink">Privacy Policy</router-link> and <router-link to="/terms-of-use" id="termsOfUse">Terms of Use</router-link>.</label>
            </div>
            <invalid-feedback v-show="errors.has('privacyTermsOfUse')" :message="errors.first('privacyTermsOfUse')"></invalid-feedback>
          </div>

          <div v-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <button type="submit" class="btn btn-success btn-lg btn-block" :class="{ 'is-loading': isLoading }" id="buttonSignup">{{ submitLabel }}</button>
        </fieldset>
      </form>

      <div class="text-center mt-4">
        <router-link to="/login" class="ml-auto font-weight-normal text-muted" id="loginLink"><u>Already have an account?</u></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import InvalidFeedback from '@/components/form/InvalidFeedback'

import { mapGetters } from 'vuex'

export default {
  name: 'CardSignup',
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    InvalidFeedback
  },
  data: () => ({
    email: null,
    emailOptIn: false,
    password: null,
    privacyTermsOfUse: false,
    viewPasswordLabel: 'Verify',
    isLoading: false
  }),
  mounted () {
    this.$refs.firstInput.focus()
  },
  computed: {
    ...mapGetters({
      error: 'user/error',
      user: 'user/user'
    }),
    submitLabel () {
      return 'Create account'
    },
    isDisabled () {
      return this.isLoading
    }
  },
  methods: {
    async handleSubmit (event) {
      const result = await this.$validator.validateAll()
      if (result) {
        this.isLoading = true
        await this.dispatchCreateUser()
        if (!this.error) this.redirectToSuccess()
        this.isLoading = false
      }
    },
    async dispatchCreateUser () {
      return this.$store.dispatch('user/create', {
        email: this.email,
        password: this.password,
        emailOptIn: this.emailOptIn
      })
    },
    redirectToSuccess () {
      if (this.$router) this.$router.push('/signup/success')
    },
    handleViewPassword (event) {
      const $input = this.$refs.inputPassword
      if ($input.getAttribute('type') === 'password') {
        $input.setAttribute('type', 'text')
        this.viewPasswordLabel = 'Hide'
      } else {
        $input.setAttribute('type', 'password')
        this.viewPasswordLabel = 'Verify'
      }
    }
  }
}
</script>

<style lang="scss">
//
</style>
