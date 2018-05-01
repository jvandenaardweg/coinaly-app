<template>
  <div class="layout-signup">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="text-center">
            <logo fill="#ffffff" :size="80"></logo>
          </div>
          <router-view></router-view>
          <!-- <div class="pt-6 text-center">
            <router-link to="/signup" class="btn btn-outline-secondary">Create an account?</router-link>
            &nbsp;
            <router-link to="/login/forgot" class="btn btn-outline-secondary">Forgot password?</router-link>
            &nbsp;
            <router-link to="/login" class="btn btn-outline-secondary ml-auto" exact>Or just login?</router-link>
          </div>
          <support-chat></support-chat> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo'

export default {
  name: 'LayoutSignup',
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/bootstrap/setting";

.layout-signup {
  padding-top: 3rem;
  background-color: $dark-blue;
  height: 100%;
}
</style>

