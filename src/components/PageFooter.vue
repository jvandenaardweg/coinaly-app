<template>
  <div class="footer">
    <p>Made with <span>&hearts;</span> in Amsterdam.</p>
    <ul>
      <li><router-link to="/privacy-policy">Privacy Policy</router-link></li>
      <li><router-link to="/terms-of-use">Terms of Use</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PageFooter'
}
</script>

<style lang="scss">
.footer {
  text-align: center;
  color: $gray-500;
  width: 320px;
  margin: 0 auto;
  margin-top: 5rem;
  margin-bottom: 2rem;

  a {
    color: $gray-500;
    // text-decoration: underline;
  }

  span {
    color: rgba($danger, 0.8);
    font-weight: 700;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
  }

  ul {
    list-style: none;
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 0;
    padding: 0;

    li {
      margin-left: 0.4rem;
      margin-right: 0.4rem;
    }
  }
}
</style>
