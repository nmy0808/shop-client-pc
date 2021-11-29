<template>
  <div class='app'>
    <router-view></router-view>
  </div>
</template>

<script>
import request from '@/uitls/request'

export default {
  methods: {
    async getDataApi() {
      const data = await request.post('/login', {
        account: 'xiaotuxian001',
        password: '123456'
      })
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang='less'>

</style>
