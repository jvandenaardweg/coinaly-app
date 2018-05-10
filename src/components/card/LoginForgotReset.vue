<template>
  <div class="card card-padded shadow-sm">
    <div class="card-body">
      <h1 class="h1 text-center mb-3">Reset your password</h1>
      <p class="text-center text-muted lead font-weight-normal">You can now reset your password</p>

      <form @submit.prevent="handleSubmit" v-if="!success">
        <fieldset :disabled="isLoading">
          <legend class="sr-only">Reset your password</legend>
          <div class="form-group">
            <label>Your new password</label>
            <div class="input-group mb-3">
              <input
                class="form-control form-control-lg"
                id="inputPassword"
                :class="{ 'is-invalid': errors.has('password'), 'is-valid': password && !errors.has('password') }"
                type="password"
                name="password"
                autocomplete="current-password"
                placeholder="Your new super secret password"
                ref="inputPassword"
                v-model="password"
                v-validate="'required'" />
              <div class="input-group-append">
                <button class="btn btn-outline-primary" type="button" ref="buttonViewPassword" @click.prevent="handleViewPassword">{{ viewPasswordLabel }}</button>
              </div>
              <invalid-feedback v-show="errors.has('password')" :message="errors.first('password')" ref="passwordError"></invalid-feedback>
            </div>
          </div>
          <div v-if="error" class="alert alert-danger text-center">
            {{ error }}
          </div>
          <button type="submit" class="btn btn-success btn-lg btn-block" id="buttonSave" :class="{ 'is-loading': isLoading }">Save new password</button>
        </fieldset>
      </form>

      <div v-if="success" class="alert alert-success">
        {{ success }}
      </div>

      <a v-if="success" href="/login" class="btn btn-primary btn-lg btn-block">Go to login</a>

      <support-chat v-if="error" color="primary" label="Start support chat"></support-chat>

      <div class="text-center mt-4" v-if="!success">
        <router-link to="/login" class="ml-auto font-weight-normal text-muted"><u>Return to login</u></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SupportChat from '@/components/SupportChat'
import InvalidFeedback from '@/components/form/InvalidFeedback'
import { mapGetters } from 'vuex'

export default {
  name: 'CardLoginForgotReset',
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    SupportChat,
    InvalidFeedback
  },
  data: () => ({
    password: null,
    viewPasswordLabel: 'Verify'
  }),
  computed: {
    ...mapGetters({
      isLoading: 'auth/isLoading',
      error: 'auth/error',
      success: 'auth/success'
    }),
    resetToken () {
      if (this.$route && this.$route.params) {
        return this.$route.params.resetToken
      } else {
        return null
      }
    }
  },
  methods: {
    async handleSubmit (event) {
      const result = await this.$validator.validateAll()
      if (result) {
        await this.$store.dispatch('auth/resetPassword', {
          password: this.password,
          resetToken: this.resetToken
        })
      }
    },
    showChat () {
      if (window.$crisp) {
        window.$crisp.push(['do', 'chat:open'])
      } else {
        window.alert('Oops, sorry. We cannot open support chat right now. Drop us an e-mail at info@coinaly.io')
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

<style lang="scss">
//
</style>
