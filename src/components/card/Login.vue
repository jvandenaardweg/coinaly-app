<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h1 class="h1 text-center mb-5">Log In</h1>
      <form @submit.prevent="handleSubmit">
        <fieldset :disabled="isDisabled">
          <legend class="sr-only">Login</legend>

          <div class="form-group">
            <label class="d-flex">E-mail address <router-link tabindex="-1" to="/signup" id="signupLink" class="ml-auto font-weight-normal text-muted"><u>No account yet?</u></router-link></label>
            <input class="form-control form-control-lg" id="inputEmail" :class="{ 'is-invalid': errors.has('email'), 'is-valid': email && !errors.has('email') }" type="email" name="email" autocomplete="email" placeholder="Your e-mail address" ref="firstInput" v-model="email" v-validate="'required|email'" />
            <invalid-feedback v-show="errors.has('email')" :message="errors.first('email')" ref="emailError"></invalid-feedback>
          </div>

          <div class="form-group">
            <label class="d-flex">Password <router-link tabindex="-1" :to="{ path: '/login/forgot', query: { prefill: email }}" id="passwordForgotLink" class="ml-auto font-weight-normal text-muted"><u>Forgot password?</u></router-link></label>
            <input class="form-control form-control-lg" id="inputPassword" :class="{ 'is-invalid': errors.has('password'), 'is-valid': password && !errors.has('password') }" type="password" name="password" autocomplete="current-password" placeholder="Your super secret password" v-model="password" v-validate="'required'" />
            <invalid-feedback v-show="errors.has('password')" :message="errors.first('password')" ref="passwordError"></invalid-feedback>
          </div>

          <div v-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <button type="submit" id="buttonLogin" class="btn btn-primary btn-lg btn-block" :class="{ 'is-loading': isLoading }">{{ submitLabel }}</button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import InvalidFeedback from '@/components/form/InvalidFeedback'
import { mapGetters } from 'vuex'

export default {
  name: 'CardLogin',
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    InvalidFeedback
  },
  data () {
    return {
      email: null,
      password: null,
      isLoading: false
    }
  },
  mounted () {
    this.$refs.firstInput.focus()
  },
  computed: {
    ...mapGetters({
      authIsLoading: 'auth/isLoading',
      isAuthenticated: 'auth/isAuthenticated',
      error: 'auth/error',
      hasKeys: 'keys/has',
      isOnboarded: 'user/isOnboarded'
    }),
    isDisabled () {
      return this.authIsLoading || this.isAuthenticated
    },
    submitLabel () {
      return 'Login'
    }
  },
  methods: {
    async handleSubmit (event) {
      const result = await this.$validator.validateAll()
      if (result) {
        this.isLoading = true
        await this.dispatchLogin()
        await this.dispatchGetMe()
        if (!this.error) {
          if (this.isOnboarded) {
            this.redirect('/')
          } else {
            this.redirect('/onboarding')
          }
        }
        this.isLoading = false
      }
    },
    async dispatchLogin () {
      return this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password
      })
    },
    async dispatchGetMe () {
      return this.$store.dispatch('user/getMe')
    },
    redirect (path) {
      if (this.$router && this.$route) {
        const redirectPath = this.$route.query.redirect

        if (path) {
          this.$router.push(path)
        } else if (redirectPath) {
          this.$router.push(redirectPath)
        } else {
          this.$router.push('/')
        }
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
