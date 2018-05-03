<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h1 class="h1 text-center mb-3">{{ title }}</h1>
      <p class="text-center text-muted lead font-weight-normal">{{ subtitle }}</p>
      <div v-if="error" class="alert alert-danger text-center">
        {{ error }}
      </div>
      <p class="text-center">{{ paragraph }}</p>
      <support-chat v-if="isFailed" color="primary" label="Start support chat"></support-chat>
      <router-link v-if="isSuccess" to="/onboarding" class="btn btn-primary btn-lg btn-block mt-7">Setup first exchange</router-link>
    </div>
  </div>
</template>

<script>
import SupportChat from '@/components/SupportChat'
import { mapGetters } from 'vuex'

export default {
  name: 'CardSignupVerify',
  components: {
    SupportChat
  },
  methods: {
    async verifyEmail () {
      await this.$store.dispatch('auth/verify', this.code)
      // 1. show loader
      // 2. verify email API call
      // 3. return message
      // 4. check if user already set up an exchange, if not: show onboarding
      // if user already has exchanges, show dashboard
    },
    showChat () {
      if (window.$crisp) {
        window.$crisp.push(['do', 'chat:open'])
      } else {
        window.alert('Oops, sorry. We cannot open support chat right now. Drop us an e-mail at info@coinaly.io')
      }
    }
  },
  mounted () {
    this.verifyEmail()
  },
  computed: {
    ...mapGetters({
      isVerified: 'auth/isVerified',
      isLoading: 'auth/isLoading',
      error: 'auth/error'
    }),
    isSuccess () {
      return this.isVerified && !this.isLoading
    },
    isBusy () {
      return this.isLoading
    },
    isFailed () {
      return this.error
    },
    title () {
      if (this.isSuccess) {
        return `Account verified! 🎉`
      } else if (this.isBusy) {
        return 'Verifying...'
      } else {
        return 'Verification failed ☹️'
      }
    },
    subtitle () {
      if (this.isSuccess) {
        return `Awesome!`
      } else if (this.isBusy) {
        return 'Hold on...'
      } else {
        return 'Well, that did not work how it should be.'
      }
    },
    paragraph () {
      if (this.isSuccess) {
        return `But you can already set up your first exchange.`
      } else if (this.isBusy) {
        return null
      } else {
        return 'Please have a chat with us when this keeps happening and we will work out a solution.'
      }
    },
    code () {
      if (this.$route && this.$route.params) {
        return this.$route.params.verificationCode
      } else {
        return null
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
