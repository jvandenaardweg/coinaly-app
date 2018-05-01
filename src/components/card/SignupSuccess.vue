<template>
  <div class="card mt-5 border-0 shadow-sm">
    <div class="card-body p-7">
      <h1 class="h2 text-center">Account created! 🎉</h1>
      <p class="text-center">Great to have you on board. You can set up your first exchange.</p>
      <router-link to="/onboarding" class="btn btn-primary btn-lg btn-block mt-7">Setup first exchange</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardSignupSuccess'
}
</script>
