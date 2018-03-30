<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="empty-state text-center">
        <h1 class="h2">There are no trades, yet.</h1>
        <p class="h4 font-weight-normal text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae eros eget elit luctus tincidunt at quis urna. </p>
        <router-link to="/buy" class="btn btn-primary btn-lg mt-5">Buy some coins</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyState'
}
</script>
