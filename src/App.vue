<template>
  <div>
    <button @click="getDataApi">request-test</button>
  </div>
</template>

<script>
import request from '@/uitls/request'

export default {
  methods: {
    async getDataApi () {
      const data = await request.post('/login', {
        account: 'xiaotuxian001',
        password: '123456'
      })
      console.log(data)
    }
  },
  mounted () {
    console.log(this.$route.fullPath)
  }
}
</script>

<style scoped lang="less">

</style>
