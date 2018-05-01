<template>
  <div class="card border-0 shadow-sm">
    <div class="card-body p-7">

      <h2 class="h2 text-center font-weight-bold">Great to have you on board!</h2>
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

      <form>
        <div class="form-group">
          <label>Email</label>
          <input class="form-control" type="email" placeholder="Your [exchange] API key" />
          <div class="form-group">
          <label><input type="checkbox" />My e-mail address can be used to send Coinaly product updates about new features.</label>
        </div>
        </div>
        <div class="form-group">
          <label>Password <button type="button">View</button></label>
          <input class="form-control" type="password" placeholder="Your [exchange] API secret" />
        </div>
        <div class="form-group">
          <label><input type="checkbox" />I agree with the Privacy Policy and Disclaimer.</label>
        </div>

      </form>
      <button type="button" class="btn btn-primary btn-lg btn-block">Next: Setup first exchange</button>


      <h2 class="h2 text-center font-weight-bold">You are all set!</h2>
      <p class="text-muted text-center">Starting engines...</p>
      <p>[rocket launch animation]</p>

    <router-link to="login">Made a mistake? Login?</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageSignupIndex'
}
</script>
