<template>
  <div v-if="text" class="card-body text-center text-muted card-partial-empty">
    <span class="h4 font-weight-normal" v-html="text"></span>
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
