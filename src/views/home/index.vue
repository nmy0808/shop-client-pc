<template>
  <div class="hone-page ">
    <div class="container">
      <home-category></home-category>
      <home-banner></home-banner>
    </div>
  </div>
</template>

<script>
import HomeCategory from '@/views/home/components/home-category'
import HomeBanner from '@/views/home/components/home-banner'

export default {
  name: 'home-page',
  components: {
    HomeBanner,
    HomeCategory
  },
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
