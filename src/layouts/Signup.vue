<template>
  <div class="layout-signup">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="text-center">
            <logo fill="#ffffff" :size="70"></logo>
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
  name: 'LayoutSignup',
  components: {
    Logo,
    SupportChat
  }
}
</script>

<style lang="scss">
.layout-signup {
  padding-top: 1rem;
  background-color: $dark-blue;
  height: 100%;

  @include media-breakpoint-up(md) {
    padding-top: 3rem;
  }
}
</style>

