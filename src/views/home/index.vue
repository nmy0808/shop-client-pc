<template>
  <div class="hone-page ">
    <div class="container">
      <home-category></home-category>
      <home-banner></home-banner>
    </div>
    <div>
      <home-new></home-new>
      <home-hot></home-hot>
    </div>
  </div>
</template>

<script>
import HomeCategory from '@/views/home/components/home-category'
import HomeBanner from '@/views/home/components/home-banner'
import HomeNew from '@/views/home/components/home-new'
import HomeHot from '@/views/home/components/home-hot'

export default {
  name: 'home-page',
  components: {
    HomeHot,
    HomeNew,
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
