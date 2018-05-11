<template>
  <div>
      add exchange form
    </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import InvalidFeedback from '@/components/form/InvalidFeedback'

export default {
  name: 'PageSettingsExchangesAdd',
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    InvalidFeedback
  },
  data: () => ({
    apiKey: null,
    apiSecret: null,
    isLoading: null
  })
}
</script>
