<template>
  <div class="home-banner">
    <c-carousel :list="banners"></c-carousel>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { getBannersApi } from '@/api'

export default {
  name: 'home-banner',
  setup () {
    const banners = ref([])
    onMounted(async () => {
      banners.value = await getBannersApi()
    })
    return {
      banners
    }
  }
}
</script>

<style scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
</style>
