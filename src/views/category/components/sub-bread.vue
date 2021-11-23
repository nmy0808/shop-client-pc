<template>
  <CBread>
    <CBreadItem to='/'>首页</CBreadItem>
    <CBreadItem :to='{name: "category", params: {id: parent.id || 1}}'>{{ parent.name }}</CBreadItem>
    <transition name='fade-right' mode='out-in'>
      <CBreadItem :key='sub.id'>{{ sub.name }}</CBreadItem>
    </transition>
  </CBread>
</template>
<script>

export default {
  name: 'SubBread',
  components: {},
  props: ['sub', 'parent'],
  setup() {
    return {}
  }
}
</script>
<style scoped lang='less'></style>
