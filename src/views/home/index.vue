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
    <div class="container">
      <home-brand></home-brand>
    </div>
  </div>
</template>

<script>
import HomeCategory from '@/views/home/components/home-category'
import HomeBanner from '@/views/home/components/home-banner'
import HomeNew from '@/views/home/components/home-new'
import HomeHot from '@/views/home/components/home-hot'
import HomeBrand from '@/views/home/components/home-brand'

export default {
  name: 'home-page',
  components: {
    HomeBrand,
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
