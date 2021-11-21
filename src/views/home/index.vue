<template>
  <div class="hone-page ">
    <div class="container">
      <home-category></home-category>
      <home-banner></home-banner>
    </div>
    <div>
      <home-new></home-new>
    </div>
  </div>
</template>

<script>
import HomeCategory from '@/views/home/components/home-category'
import HomeBanner from '@/views/home/components/home-banner'
import HomeNew from '@/views/home/components/home-new'

export default {
  name: 'home-page',
  components: {
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
