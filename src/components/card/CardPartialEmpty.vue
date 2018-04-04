<template>
  <div v-if="isEmpty" class="card-body text-center text-muted">
    <span class="h4 font-weight-normal">{{ text }}</span>
    <div v-if="actionLink && actionLabel" class="mt-5">
      <router-link :to="actionLink" class="btn btn-outline-primary" exact>{{ actionLabel }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardPartialEmpty',
  props: ['isEmpty', 'text', 'actionLink', 'actionLabel'],
  // Using empty data fixes some weird Jest coverage issues
  data () {
    return {}
  }
}
</script>
