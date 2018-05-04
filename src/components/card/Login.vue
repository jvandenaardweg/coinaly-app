<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h1 class="h1 text-center mb-5">Log In</h1>
      <form @submit.prevent="handleSubmit">
        <fieldset :disabled="isDisabled">
          <legend class="sr-only">Login</legend>
          <div class="form-group">
            <label class="d-flex">E-mail address <router-link to="/signup" id="signupLink" class="ml-auto font-weight-normal text-muted"><u>No account yet?</u></router-link></label>
            <input class="form-control form-control-lg" id="inputEmail" :class="{ 'is-invalid': errors.has('email'), 'is-valid': email && !errors.has('email') }" type="email" name="email" autocomplete="email" placeholder="Your e-mail address" ref="firstInput" v-model="email" v-validate="'required|email'" />
            <div v-show="errors.has('email')" ref="emailError" class="invalid-feedback">
              {{ errors.first('email') }}
            </div>
          </div>
          <div class="form-group">
            <label class="d-flex">Password <router-link to="/login/forgot" id="passwordForgotLink" class="ml-auto font-weight-normal text-muted"><u>Forgot password?</u></router-link></label>
            <input class="form-control form-control-lg" id="inputPassword" :class="{ 'is-invalid': errors.has('password'), 'is-valid': password && !errors.has('password') }" type="password" name="password" autocomplete="current-password" placeholder="Your super secret password" v-model="password" v-validate="'required'" />
            <div v-show="errors.has('password')" ref="passwordError" class="invalid-feedback">
              {{ errors.first('password') }}
            </div>
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
import { mapGetters } from 'vuex'

export default {
  name: 'CardLogin',
  $_veeValidate: {
    validator: 'new'
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
      error: 'auth/error'
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
        if (!this.error) this.redirectToHomepage()
        this.isLoading = false
      }
    },
    async dispatchLogin () {
      return this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password
      })
    },
    redirectToHomepage () {
      if (this.$router) this.$router.push('/')
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
