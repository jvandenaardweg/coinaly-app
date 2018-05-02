<template>
  <div class="layout-onboarding">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="text-center">
            <logo fill="#000000" :size="70"></logo>
          </div>
          <router-view></router-view>
          <support-chat color="secondary"></support-chat>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo'
import SupportChat from '@/components/SupportChat'

export default {
  name: 'LayoutOnboarding',
  components: {
    Logo,
    SupportChat
  }
}
</script>

<style lang="scss">
.layout-onboarding {
  height: 100%;
  padding-top: 1rem;

  @include media-breakpoint-up(md) {
    padding-top: 3rem;
  }
}
</style>
