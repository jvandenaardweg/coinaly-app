<template>
  <div class="card border-0 shadow-sm">
    <div class="card-body p-7">

      <h2 class="h2 text-center">Great to have you on board!</h2>
      <p class="text-muted text-center">Your account is now set up. Now let's add your first exchange to get started. You can always add more exchanges later.</p>
      <form>
        <div class="form-group">
          <label>Exchange</label>
          <select class="form-control">
            <option>test</option>
          </select>
        </div>
        <div class="form-group">
          <label>API Key</label>
          <input class="form-control" type="text" placeholder="Your [exchange] API key" />
        </div>
        <div class="form-group">
          <label>API Secret</label>
          <input class="form-control" type="text" placeholder="Your [exchange] API secret" />
        </div>
      </form>
      <button type="button" class="btn btn-primary btn-lg btn-block btn-success">Save exchange</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageOnboarding'
}
</script>
