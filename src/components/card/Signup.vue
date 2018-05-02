<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h1 class="h1 text-center mb-3">Get started</h1>
      <p class="text-center text-muted lead font-weight-normal">Create your free Coinaly account to make cryptocurrency trading easier and portfolio insights more helpful.</p>
      <hr />
      <form @submit.prevent="handleSubmit">
        <fieldset :disabled="isLoading">
          <legend class="sr-only">Signup</legend>

          <div class="form-group">
            <label>E-mail address</label>
            <input class="form-control" type="email" name="email" autocomplete="email" v-model="email" placeholder="Your e-mail address" required />
          </div>

          <div class="form-group">
            <label>Password</label>
            <div class="input-group mb-3">
              <input class="form-control" type="password" name="password" autocomplete="password" ref="inputPassword" v-model="password" placeholder="Your super secret password" required />
              <div class="input-group-append">
                <button class="btn btn-outline-primary" type="button" @click.prevent="handleViewPassword">{{ viewPasswordLabel }}</button>
              </div>
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
              <input type="checkbox" class="custom-control-input" v-model="acceptedPrivacyDisclaimer" id="privacy-disclaimer" required>
              <label class="custom-control-label font-weight-normal" for="privacy-disclaimer">I agree with the <router-link to="/privacy">Privacy Policy</router-link> and <router-link to="/disclaimer">Disclaimer</router-link>.</label>
            </div>
          </div>

          <div v-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <button type="submit" class="btn btn-success btn-lg btn-block">{{ submitButtonLabel }}</button>
        </fieldset>
      </form>

      <div class="text-center mt-4">
        <router-link to="/login" class="ml-auto font-weight-normal text-muted"><u>Already have an account?</u></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CardSignup',
  data () {
    return {
      email: null,
      acceptedEmailOptIn: null,
      password: null,
      acceptedPrivacyDisclaimer: null,
      viewPasswordLabel: 'Verify'
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'user/isLoading',
      error: 'user/error',
      user: 'user/user'
    }),
    submitButtonLabel () {
      return (this.isLoading) ? 'Creating account...' : 'Create account'
    }
  },
  methods: {
    async handleSubmit (event) {
      try {
        const createdUser = await this.$store.dispatch('user/create', {
          email: this.email,
          password: this.password,
          emailOptIn: this.acceptedEmailOptIn
        })
        if (createdUser) {
          this.$router.push('/signup/success')
        }
      } catch (err) {
        console.log('Error happened while creating the user in card component', err)
      }
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
