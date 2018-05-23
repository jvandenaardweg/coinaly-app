<template>
  <div class="text-center mt-5">
    <div class="alert alert-success" v-if="success">
      {{ success }}
    </div>
    <div class="alert alert-danger" v-if="error">
      {{ error }}
    </div>
    <button type="button" class="btn btn-light" @click.prevent="handleClick">{{ submitLabel }}</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BtnDeleteAccount',
  data: () => ({
    isLoading: null
  }),
  computed: {
    ...mapGetters({
      error: 'user/error',
      success: 'user/success'
    }),
    submitLabel () {
      return (this.isLoading) ? 'Deleting...' : 'Delete account'
    }
  },
  methods: {
    async handleClick (event) {
      if (window.confirm('Do you want to continue deleting your account?')) {
        if (window.confirm('Deleting your account will permanently delete all your data. Are you sure?')) {
          this.isLoading = true
          await this.dispatchDeleteAccount()
          if (!this.error) {
            this.dispatchLogout()
          } else {
            this.isLoading = false
          }
        }
      }
    },
    dispatchDeleteAccount () {
      return this.$store.dispatch('user/deleteMe')
    },
    dispatchLogout () {
      setTimeout(() => {
        this.$store.dispatch('auth/logout')
        this.isLoading = false
      }, 2000)
    }
  }
}
</script>
