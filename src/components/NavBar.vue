<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container justify-content-center">

      <btn-back v-if="showBack" class="mr-auto"></btn-back>

      <router-link v-if="!showBack" class="navbar-brand p-0 d-flex flex-row align-items-center mr-auto" to="/" exact>
        <logo fill="#ffffff"></logo>
      </router-link>

      <div class="align-items-center d-sm-none">
        <h1 class="text-white m-0 h4">{{ routeName }}</h1>
      </div>

      <div v-if="isAuthenticated" class="d-flex ml-auto">
        <btn-refresh class="d-none d-sm-block"></btn-refresh>
        <btn-select-exchange></btn-select-exchange>
      </div>

    </div>
  </nav>
</template>

<script>
import BtnBack from '@/components/btn/Back'
import BtnRefresh from '@/components/btn/Refresh'
import BtnSelectExchange from '@/components/btn/SelectExchange'
import Logo from '@/components/Logo'
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  components: {
    BtnRefresh,
    BtnSelectExchange,
    BtnBack,
    Logo
  },
  data: () => ({
    show: false
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    }),
    routeName () {
      if (this.$route && this.$route.name) return this.$route.name
    },
    showBack () {
      if (this.$route && this.$route.path) {
        const splitted = this.$route.path.split('/')
        if (splitted.length > 2) {
          return true
        }
      }
      return false
    }
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    }
  }
}
</script>


<style lang="scss">
.navbar {
  background-color: $blue;
  height: 3.75rem;
  border: 0 !important;
}

.navbar-nav {
  .nav-link {
    color: $white;
    font-weight: bold;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    font-size: 1.05rem;
    &.active {
      background: #517AB8;
      border-radius: $border-radius;
    }
  }
}
</style>
