<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-10 col-md-10 col-lg-6 col-xl-6">
        <div class="card">
          <div class="card-header">
            <sub-nav :items="subNavItems" :selected="selected"></sub-nav>
          </div>
          <div class="card-body">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </div>
        <btn-delete-account></btn-delete-account>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardLoading from '@/components/card/CardPartialLoading'
import CardEmpty from '@/components/card/CardPartialEmpty'
import Loader from '@/components/Loader'
import SubNav from '@/components/SubNav'
import BtnDeleteAccount from '@/components/btn/DeleteAccount'

export default {
  name: 'PageSettings',
  components: {
    SubNav,
    CardLoading,
    CardEmpty,
    Loader,
    BtnDeleteAccount
  },
  data () {
    return {
      subNavItems: [
        {
          label: 'Account',
          slug: 'account',
          uri: '/settings'
        },
        {
          label: 'Exchanges',
          slug: 'exchanges',
          uri: '/settings/exchanges'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      isLoadingKeys: 'keys/isLoading',
      isLoadingExchanges: 'exchanges/isLoading'
    }),
    isLoading () {
      return this.isLoadingKeys || this.isLoadingExchanges
    },
    selected () {
      return (this.$route && this.$route.meta.slug) ? this.$route.meta.slug : null
    }
  }
}
</script>
