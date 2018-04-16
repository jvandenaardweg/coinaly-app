<template>
  <div class="percentage-badge" :class="colorClass">
    {{ percentage | percentage}}
  </div>
</template>

<script>
export default {
  name: 'PercentageBadge',
  props: ['percentage'],
  computed: {
    colorClass () {
      if (this.percentage >= 0) {
        return 'bg-success'
      } else {
        return 'bg-danger'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.percentage-badge {
  border-radius: 3px;
  padding: 0.4rem 0;
  color: #fff;
  font-weight: 600;
  width: 3.8rem;
  text-align: center;
}
</style>
