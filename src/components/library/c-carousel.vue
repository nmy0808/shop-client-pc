<template>
  <div class='c-carousel' @mouseleave="handleAutoPlay" @mouseenter="handlePausePlay">
    <ul class="carousel-body">
      <!--      fade-->
      <li class="carousel-item" :class="{fade:currentIndex === index}" v-for="(item,index) in list" :key="item.id">
        <RouterLink to="/">
          <img :src="item.imgUrl">
        </RouterLink>
      </li>
    </ul>
    <a href="javascript:;" @click="handlePrev" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <a href="javascript:;" @click="handleNext" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <div class="carousel-indicator">
      <span @click="handleSkip(index)" :class="{active:index === currentIndex}" v-for="(item,index) in list"
            :key="item.id"></span>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  name: 'CCarousel',
  props: {
    list: Array,
    default: []
  },
  setup (props) {
    const currentIndex = ref(0)
    let timer = null
    const handleNext = () => {
      if (props.list.length === 0) return
      currentIndex.value = (currentIndex.value + 1) % props.list.length
    }
    const handlePrev = () => {
      if (props.list.length === 0) return
      currentIndex.value = currentIndex.value - 1 < 0 ? props.list.length - 1 : currentIndex.value - 1
    }
    const handleSkip = (index) => {
      currentIndex.value = index
    }
    const handleAutoPlay = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        handleNext()
      }, 2000)
    }
    const handlePausePlay = () => {
      clearInterval(timer)
    }
    onMounted(() => {
      handleAutoPlay()
    })
    return {
      currentIndex,
      handleNext,
      handlePrev,
      handleSkip,
      handlePausePlay,
      handleAutoPlay
    }
  }
}
</script>
<style scoped lang="less">
.c-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;

  .carousel {

    &-body {
      width: 100%;
      height: 100%;
    }

    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;

      &.fade {
        opacity: 1;
        z-index: 1;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      margin-left: 100px;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;

        ~ span {
          margin-left: 12px;
        }

        &.active {
          background: #fff;
        }
      }
    }

    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, .2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;

      &.prev {
        left: 20px;
        margin-left: 250px;

      }

      &.next {
        right: 20px;
      }
    }
  }

  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
