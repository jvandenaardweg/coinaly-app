<template>
  <div class="card-body text-center text-muted">
    <span class="h5">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'EmptyCard',
  props: ['text']
}
</script>
