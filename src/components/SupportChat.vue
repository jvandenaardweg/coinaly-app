<template>
  <div class="text-center pt-7">
    <button type="button" :class="btnClass" @click.prevent="handleClick" ref="chatButton">{{ buttonLabel }}</button>
  </div>
</template>

<script>
export default {
  name: 'SupportChat',
  props: {
    label: {
      type: String
    },
    color: {
      type: String
    }
  },
  computed: {
    buttonLabel () {
      return (this.label) ? this.label : `Need help? Let's have a chat.`
    },
    btnClass () {
      return (this.color) ? `btn btn-outline-${this.color}` : 'btn btn-outline-light'
    }
  },
  methods: {
    handleClick (event) {
      if (window.$crisp) {
        window.$crisp.push(['do', 'chat:open'])
      } else {
        window.alert('Oops, sorry. We cannot open support chat right now. Drop us an e-mail at info@coinaly.io')
      }
    }
  }
}
</script>
