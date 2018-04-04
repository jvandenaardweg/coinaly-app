<template>
  <div v-if="isLoading" class="card-body text-center text-muted">
    <span class="h5">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'CardPartialLoading',
  props: ['isLoading', 'text'],
  // Using empty data fixes some weird Jest coverage issues
  data () {
    return {}
  }
}
</script>
