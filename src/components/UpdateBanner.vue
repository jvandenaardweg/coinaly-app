<template>
  <div class="update-banner" v-if="hasUpdate">
    <div class="update-banner-message">
      <h2 class="h3">Coinaly updated</h2>
      <p>We have updated Coinaly recently. To enjoy the new features just use the button below.</p>
      <button type="button" class="btn btn-primary" @click.prevent="handleClick">Use new version</button>
    </div>
  </div>
</template>

<script>
import timer from 'battery-friendly-timer'

// Resources used:
// https://marmelab.com/blog/2016/08/29/auto-reload-spa-on-mobile-setinterval.html
// https://github.com/marmelab/battery-friendly-timer

export default {
  name: 'UpdateBanner',
  data: () => ({
    previousHash: null,
    hasUpdate: false,
    interval: null
  }),
  props: {
    tryDelay: {
      type: Number,
      required: false,
      default: (5 * 60 * 1000) // 5 minutes
    },
    forceDelay: {
      type: Number,
      required: false,
      default: (30 * 60 * 1000) // 30 minutes
    }
  },
  beforeMount () {
    this.interval = timer.setInterval(
      () => fetch(this.fetchUrl)
        .then(response => {
          if (response.status !== 200) {
            throw new Error('offline')
          }
          return response.text()
        })
        .then(html => {
          console.log(html)
          if (!this.previousHash) {
            this.previousHash = this.hash(html)
            return
          }
          if (this.previousHash !== this.hash(html)) {
            // Set the new hash
            this.previousHash = this.hash(html)

            // Show the message
            this.hasUpdate = true

            // Disconnect the user from the websocket, it needs to reload
            // So, making sure the code does not error because we updated the websocket data
            this.$store.dispatch('websockets/disconnect')
          }
        })
        .catch(err => {
          console.log('Error fetching index.html to check for new release', err)
        }),
      this.tryDelay,
      this.forceDelay
    )
  },
  computed: {
    fetchUrl () {
      if (process.env.NODE_ENV === 'production') {
        return 'https://app.coinaly.io/index.html'
      } else {
        return 'http://localhost:8080/index.html'
      }
    }
  },
  methods: {
    handleClick () {
      window.location.reload(true)
    },
    hash (str) {
      // Taken from http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery/7616484#7616484
      const len = str.length
      let hash = 0
      if (len === 0) return hash
      let i
      for (i = 0; i < len; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i)
        hash |= 0 // Convert to 32bit integer
      }
      return hash
    }
  }
}
</script>

<style lang="scss">
.update-banner {
  z-index: 9999999;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  justify-content: center;

  &:before {
    content: "";
    background: rgba($black, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }

  .update-banner-message {
    background: $white;
    border-radius: $border-radius;
    position: fixed;
    width: 90%;
    padding: 1.5rem 1rem;
    text-align: center;
    align-self: center;
    max-width: 400px;
  }
}
</style>
