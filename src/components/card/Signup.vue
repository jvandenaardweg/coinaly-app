<template>
  <div class="card shadow-sm">
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
              :class="{ 'is-invalid': errors.has('email'), 'is-valid': email && !errors.has('email') }" 
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
                :class="{ 'is-invalid': errors.has('password'), 'is-valid': password && !errors.has('password') }" 
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
              <input type="checkbox" class="custom-control-input" v-model="acceptedEmailOptIn" id="email-optin">
              <label class="custom-control-label font-weight-normal" for="email-optin">My e-mail address can be used to send Coinaly product updates about new features</label>
            </div>
          </div>

          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" name="privacyDisclaimer" data-vv-as="Privacy Policy and Disclaimer" :class="{ 'is-invalid': errors.has('privacyDisclaimer')}" v-model="privacyDisclaimer" id="privacy-disclaimer" v-validate="'required'">
              <label class="custom-control-label font-weight-normal" for="privacy-disclaimer">I agree with the <router-link to="/privacy">Privacy Policy</router-link> and <router-link to="/disclaimer">Disclaimer</router-link>.</label>
            </div>
            <invalid-feedback v-show="errors.has('privacyDisclaimer')" :message="errors.first('privacyDisclaimer')"></invalid-feedback>
          </div>

          <div v-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <button type="submit" class="btn btn-success btn-lg btn-block">{{ submitLabel }}</button>
        </fieldset>
      </form>

      <div class="text-center mt-4">
        <router-link to="/login" class="ml-auto font-weight-normal text-muted"><u>Already have an account?</u></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import InvalidFeedback from '@/components/form/InvalidFeedback'

import { mapGetters } from 'vuex'

export default {
  name: 'CardSignup',
  components: {
    InvalidFeedback
  },
  data () {
    return {
      email: null,
      acceptedEmailOptIn: null,
      password: null,
      privacyDisclaimer: null,
      viewPasswordLabel: 'Verify'
    }
  },
  mounted () {
    this.$refs.firstInput.focus()
  },
  computed: {
    ...mapGetters({
      isLoading: 'user/isLoading',
      error: 'user/error',
      user: 'user/user'
    }),
    submitLabel () {
      return (this.isLoading) ? 'Creating account...' : 'Create account'
    },
    isDisabled () {
      return this.isLoading
    }
  },
  methods: {
    async handleSubmit (event) {
      const result = await this.$validator.validateAll()
      if (result) {
        const createdUser = await this.dispatchCreateUser()
        if (createdUser) {
          this.redirectToSuccess()
        }
      }
    },
    dispatchCreateUser () {
      return this.$store.dispatch('user/create', {
        email: this.email,
        password: this.password,
        emailOptIn: this.acceptedEmailOptIn
      })
    },
    redirectToSuccess () {
      this.$router.push('/signup/success')
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
