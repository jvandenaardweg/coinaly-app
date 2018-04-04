<template>
  <div v-if="isLoading" class="card-body text-center text-muted">
    <span class="h5">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'CardLoading',
  props: ['isLoading', 'text']
}
</script>
