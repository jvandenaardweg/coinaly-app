<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 200 200">
    <g fill="none" fill-rule="evenodd">
      <circle cx="100" cy="100" r="100" fill="transparent"/>
      <g :fill="fillColor" fill-rule="nonzero">
        <path d="M121.7 121.1a97 97 0 0 0 35-74.4c0-1.7-1.6-3.3-3.4-3.3a97.1 97.1 0 0 0-74.3 35 41 41 0 0 0-39.7 40.1c0 2.6 3.8 5.2 6.2 1.8 1.3-1.8 2.4-3.7 4-5.1 3.6-3.7 8.2-6.1 13.2-7 .1.5.4 1 .8 1.4l27 27 1.3.8c-.8 5-3.2 9.6-6.9 13.3-1.5 1.4-3.3 2.5-5.1 3.9-3.8 2.7-.5 6.3 1.8 6.2a41.2 41.2 0 0 0 40.1-39.7zm28.2-71c-.3 8.8-2 17.3-4.7 25.4L124.5 55a86.6 86.6 0 0 1 25.4-4.8zM48.1 107.5a34.2 34.2 0 0 1 25.3-21.8 226 226 0 0 0-8.6 15.5c-6.1.5-11.9 2.6-16.7 6.3zm45.5 22.7l-23.8-23.7a90.4 90.4 0 0 1 48-49l24.8 24.8a90.4 90.4 0 0 1-49 48zm5.2 5c4.7-2 15.4-8.4 15.5-8.5a34.1 34.1 0 0 1-21.7 25.2 31.6 31.6 0 0 0 6.2-16.6z"/>
        <path d="M63.5 117.5a3.3 3.3 0 0 0-4.8 0L47 129.3a3.3 3.3 0 1 0 4.7 4.7l11.9-11.8a3.3 3.3 0 0 0 0-4.7zM73 127c-.6-.6-1.5-1-2.4-1a3 3 0 0 0-1.6.5l-.8.5-23.7 23.7-.4.6a3.3 3.3 0 0 0 5.2 4.1L73 131.7l.5-.7c.8-1.3.6-2.9-.5-4zm9.6 9.6a3.3 3.3 0 0 0-4.8 0L66 148.4a3.3 3.3 0 1 0 4.7 4.7l11.9-11.8a3.3 3.3 0 0 0 0-4.7z"/>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    fill: {
      type: String
    },
    size: {
      type: Number
    }
  },
  computed: {
    fillColor () {
      return (this.fill) ? this.fill : '#ffffff'
    },
    width () {
      return (this.size) ? this.size : 40
    },
    height () {
      return (this.size) ? this.size : 40
    }
  }
}
</script>
