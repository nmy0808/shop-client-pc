<template>
  <div class='app'>
    <button @click='open'>open</button>
    <router-view></router-view>
  </div>
</template>

<script>
import request from '@/uitls/request'
import CConfirm from '@/components/library/c-confirm'
import Confirm from '@/components/library/confirm'

export default {
  methods: {
    open() {
      Confirm({ text: '您确定从购物车删除该商品吗？' }).then(res => {
        console.log('confirm')
      }).catch(res => {
        console.log('cancel')
      })
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang='less'>

</style>
