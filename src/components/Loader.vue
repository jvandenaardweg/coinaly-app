<template>
  <div class="loader">Loading...</div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style lang="scss">
.loader,
.loader:after {
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  overflow: hidden;
}
.loader {
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 0.3rem solid rgba($blue, 0.2);
  border-right: 0.3rem solid rgba($blue, 0.2);
  border-bottom: 0.3rem solid rgba($blue, 0.2);
  border-left: 0.3rem solid $blue;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 800ms infinite linear;
  animation: load8 800ms infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}


</style>
