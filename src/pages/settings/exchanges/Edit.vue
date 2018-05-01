<template>
  <form>
    <p>edit exchange {{ param }}</p>

  </form>
</template>

<script>
export default {
  name: 'PageSettingsExchangesEdit',
  computed: {
    param () {
      return (this.$route) ? this.$route.params.edit : null
    }
  }
}
</script>
