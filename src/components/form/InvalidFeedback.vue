<template>
  <div class="invalid-feedback d-block">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'InvalidFeedback',
  props: {
    message: String
  }
}
</script>
