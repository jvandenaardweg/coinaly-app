<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-10 col-md-10 col-lg-6 col-xl-6">
        <div class="card">
          <div class="card-header">
            <SubNav :items="subNavItems" :selected="selected"></SubNav>
          </div>
          <div class="card-body">
            <transition>
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </transition>
          </div>
        </div>
        <button type="submit" class="btn btn-outline-secondary mt-5">Delete account</button>
      </div>
    </div>
  </div>
</template>

<script>
import SubNav from '@/components/SubNav'

export default {
  name: 'PageSettings',
  components: {
    SubNav
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
    selected () {
      return (this.$route && this.$route.meta.slug) ? this.$route.meta.slug : null
    }
  }
}
</script>
