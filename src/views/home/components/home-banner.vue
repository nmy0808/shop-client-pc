<template>
  <div class="home-banner">
    <c-carousel></c-carousel>
  </div>
</template>

<script>
export default {
  name: 'home-banner'
}
</script>

<style scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98
}
</style>
