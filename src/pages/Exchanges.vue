<template>
  <div>
    <!-- <div class="page-header">
      <h1 class="page-title">
        Page: Exchanges
      </h1>
    </div> -->
      <EmptyState
      :title="'You have not setup an exchange, yet'"
      :content="'Setup your first exchange to get better insights and make you a better trader.'"
      :action="'Setup first exchange'"
      :link="'/onboarding'"
      ></EmptyState>
  </div>
</template>

<script>
import EmptyState from '../components/EmptyState.vue'

export default {
  name: 'PageExchanges',
  components: {
    EmptyState
  }
}
</script>
