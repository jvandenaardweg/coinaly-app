<template>
  <div class="layout-login">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="text-center">
            <logo fill="#ffffff" :size="70"></logo>
          </div>
          <router-view></router-view>
          <!-- <div class="pt-6 text-center">
            <router-link to="/signup" class="btn btn-outline-light">Create an account?</router-link>
            &nbsp;
            <router-link to="/login/forgot" class="btn btn-outline-light">Forgot password?</router-link>
            &nbsp;
            <router-link to="/login" class="btn btn-outline-light ml-auto" exact>Or just login?</router-link>
          </div> -->
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
  name: 'LayoutLogin',
  components: {
    Logo,
    SupportChat
  }
}
</script>

<style lang="scss">
@import "../scss/bootstrap/setting";

.layout-login {
  padding-top: 3rem;
  background-color: $dark-blue;
  height: 100%;
}
</style>
