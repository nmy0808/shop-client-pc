<template>
  <div class='goods-image'>
    <div class='large'
         v-show='show'
         :style='[{backgroundImage:`url(${images[currIndex]})`}, largeStyle]'>
    </div>
    <div class='middle'
         ref='target'>
      <img :src='images[currIndex]' alt=''>
      <div class='layer' v-show='show' :style='layerStyle'></div>
    </div>
    <ul class='small'>
      <li v-for='(img,i) in images' :key='img' :class='{active:i===currIndex}'>
        <img @mouseenter='currIndex=i' :src='img' alt=''>
      </li>
    </ul>
  </div>
</template>
<script>
import { computed, reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'

export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const currIndex = ref(0)
    const target = ref(null)
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    const layerStyle = reactive({})
    const largeStyle = reactive({})
    const show = ref(false)
    watch([elementX, elementY, isOutside], () => {
      const result = {}
      let minLeft = elementX.value - 100
      let minTop = elementY.value - 100
      if (minLeft < 0) {
        minLeft = 0
      }
      if (minLeft > 200) {
        minLeft = 200
      }
      if (minTop < 0) {
        minTop = 0
      }
      if (minTop > 200) {
        minTop = 200
      }
      layerStyle.left = minLeft + 'px'
      layerStyle.top = minTop + 'px'
      largeStyle.backgroundPositionX = -minLeft * 2 + 'px'
      largeStyle.backgroundPositionY = -minTop * 2 + 'px'
      show.value = !isOutside.value
    })
    return { currIndex, show, target, layerStyle, largeStyle }
  }
}
</script>
<style scoped lang='less'>
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;

    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, .2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover, &.active {
        border: 2px solid @mainColor;
      }
    }
  }
}
</style>
