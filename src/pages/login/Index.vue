<template>
  <div class="card">
    <div class="card-body p-7">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>E-mail address</label>
          <input class="form-control" type="email" placeholder="Your e-mail address" ref="firstInput" v-model="email" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input class="form-control" type="password" placeholder="Your super secret password" v-model="password" />
        </div>

        <div v-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <button type="submit" class="btn btn-primary btn-lg btn-block">{{ submitLabel }}</button>

      </form>
    </div>
    <!-- <div class="card-footer d-flex pl-7 pr-7">
      <router-link to="/signup" class="btn btn-outline-secondary">Create an account</router-link>
      <router-link to="/login/forgot" class="btn btn-outline-secondary ml-auto">Forgot password?</router-link>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageLogin',
  data () {
    return {
      email: null,
      password: null
    }
  },
  mounted () {
    this.$refs.firstInput.focus()
  },
  computed: {
    ...mapGetters({
      authIsLoading: 'auth/isLoading',
      error: 'auth/error'
    }),
    submitLabel () {
      return (this.authIsLoading) ? 'Loading...' : 'Login'
    }
  },
  methods: {
    handleSubmit (event) {
      this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
