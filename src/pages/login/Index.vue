<template>
  <div>
    <p>show login form</p>
    <form @submit.prevent="handleSubmit">
      <input type="email" placeholder="email" v-model="email" />
      <input type="password" placeholder="password" v-model="password" />
      <button type="submit">{{ submitLabel }}</button>
    </form>
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
  computed: {
    ...mapGetters({
      authIsLoading: 'auth/isLoading'
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
