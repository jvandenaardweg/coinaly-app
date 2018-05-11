<template>
  <div class="layout-focus">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="text-center">
            <router-link to="/">
              <logo fill="#ffffff" :size="70"></logo>
            </router-link>
          </div>
          <router-view></router-view>
          <support-chat></support-chat>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo'
import SupportChat from '@/components/SupportChat'

export default {
  name: 'LayoutFocus',
  components: {
    Logo,
    SupportChat
  },
  mounted () {
    document.querySelector('body').classList.add('bg-dark-blue')
  }
}
</script>

<style lang="scss">
.layout-focus {
  background-color: $dark-blue;
  padding-top: 5rem;
  padding-bottom: 5rem;

  @include media-breakpoint-up(md) {
    padding-top: 3rem;
  }
}
</style>
