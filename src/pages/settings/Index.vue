<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5">
        <div class="card">
          <div class="card-header">
            <SubNav :items="subNavItems" :selected="$route.meta.slug"></SubNav>
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
  }
}
</script>
