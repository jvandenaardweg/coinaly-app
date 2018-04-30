<template>
  <div class="card">
    <div class="card-body p-7">
      <form>
        <div class="form-group">
          <label>E-mail address</label>
          <input class="form-control" type="email" placeholder="The e-mail address you signed up with" ref="firstInput" v-model="email" />
        </div>

        <div v-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <button type="submit" class="btn btn-primary btn-lg btn-block">{{ submitLabel }}</button>

      </form>
    </div>
    <!-- <div class="card-footer d-flex pl-7 pr-7">
      <router-link to="/signup" class="btn btn-outline-secondary">Create an account</router-link>
      <router-link to="/login" class="btn btn-outline-secondary ml-auto">Login?</router-link>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'PageLoginForgot',
  data () {
    return {
      email: null,
      submitLabel: 'Reset password',
      error: null
    }
  },
  mounted () {
    this.$refs.firstInput.focus()
  }
}
</script>
