<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container">

      <btn-back class="navbar-back" v-if="showBack" ref="navbarBack"></btn-back>

      <router-link class="navbar-brand" v-if="!showBack" to="/" ref="navbarBrand" exact>
        <logo fill="#ffffff"></logo>
      </router-link>

      <div class="navbar-title d-sm-none" ref="navbarTitle">
        <h1 class="h4">{{ routeName }}</h1>
      </div>

      <div class="navbar-authenticated" v-if="isAuthenticated" ref="navbarAuthenticated">
        <btn-refresh class="d-none d-sm-block"></btn-refresh>
        <btn-select-exchange></btn-select-exchange>
        <btn-settings class="ml-1"></btn-settings>
      </div>

    </div>
  </nav>
</template>

<script>
import BtnBack from '@/components/btn/Back'
import BtnRefresh from '@/components/btn/Refresh'
import BtnSettings from '@/components/btn/Settings'
import BtnSelectExchange from '@/components/btn/SelectExchange'
import Logo from '@/components/Logo'
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  components: {
    BtnRefresh,
    BtnSelectExchange,
    BtnSettings,
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
  }
}
</script>

<style lang="scss">
.navbar {
  background-color: $blue;
  height: 3.75rem;
  border-bottom: 0 !important;

  .container {
    justify-content: center;
  }

  .navbar-back {
    margin-right: auto;
  }

  .navbar-brand {
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: auto;
    margin-left: -7px;
  }

  .navbar-title {
    position: absolute;
    align-items: center;
    width: 100%;
    text-align: center;

    h1 {
      color: $white;
      margin: 0;
    }
  }

  .navbar-authenticated {
    display: flex;
    margin-left: auto;
  }
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
