<template>
  <div class="hone-page ">
    <div class="container">
      <home-category></home-category>
    </div>
  </div>
</template>

<script>
import HomeCategory from '@/views/home/components/home-category'

export default {
  name: 'home-page',
  components: { HomeCategory },
  methods: {
    boxClick (e) {
    }
  }
}
</script>

<style scoped lang="less">
.hone-page {
}
</style>
